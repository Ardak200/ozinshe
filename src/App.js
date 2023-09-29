import React, {Fragment, Component, useEffect} from "react";
import "./style.css";
import {
    BrowserRouter, Link, Route, Switch, useLocation, withRouter,Redirect
} from 'react-router-dom';
import MainPage from "./pages";
import Login from "./pages/login"
import Projects from "./pages/projects/projects"
import ProjectAdd  from "./pages/projects/add"
import Categories from "./pages/categories"
import DocumentMeta from 'react-document-meta'
import Navigation from "./components/Navigation";
import NavigationSearch from "./components/NavigationSearch";
import { Provider } from "react-redux";
import withBreadcrumbs from "react-router-breadcrumbs-hoc";
import Users from "./pages/users";
import Roles from "./pages/roles";
import { ConfigureStore } from './redux/store/configureStore';
import DetailedProject from "./pages/projects/detailedProject";
import Genre from "./pages/genre";
import MoviesMain from "./pages/movies-main";
import ProjectEdit from "./pages/projects/edit";
import AddProject from "./pages/projects/addProject";
import SearchResult from "./pages/searchResult";
import EditProject from "./pages/projects/editProject";
import PageNotFound from "./pages/404";

const store = ConfigureStore();

const routes = [
    { path: "/projects/add", breadcrumb: "Добавить проект" },
    {path: "/projects/add?step=3", breadcrumb: "Добавить"},
    {path: "/project/edit/:id", breadcrumb: "Редактировать"},
    {path: "/", breadcrumb: ""},
    {path: "/projects", breadcrumb: "Проекты"},
    ];

const Breadcrumbs = withBreadcrumbs(routes)(({ breadcrumbs }) => (
    <div className="breadcumb-lists">
        { breadcrumbs.length>2 && breadcrumbs.map(({ index,match, breadcrumb }) => (
            <span key={match.url}>
        <Link to={match.url}>{breadcrumb}
        </Link>
      </span>
        ))}
    </div>
));

const App = () => {
    const meta = {
        title: 'Ozinshe',
        description: 'Ozinshe',
        meta: {
            charset: 'utf-8',
            name: {
                viewport: 'width=1024',
                keywords: 'ozinshe, film'
            }
        }
    };
    return (
        <DocumentMeta {...meta}>
            <Fragment>
                <Provider store={store}>
                    <BrowserRouter>
                            <Route exact path="/" component={MainPage}>
                                <Redirect push to="/login" />
                            </Route>
                            <Route path="/login" component={Login}/>

                            <div className={"container-fluid"}>
                                <div className={"row"}>
                                    <Navigation/>
                                    <div className="col offset-2" id="main">
                                        <NavigationSearch/>
                                        <div className="page-content">
                                            {/*<div className="breadcrumb">*/}
                                            {/*    <Breadcrumbs />*/}
                                            {/*</div>*/}
                                            <Route exact path="/projects" component={Projects}/>
                                            <Route path="/projects/:id"
                                                   render={(props)=>
                                                       <DetailedProject {...props} />
                                                   }
                                            />
                                            <Route exact path="/categories" component={Categories}/>
                                            <Route exact path="/projects/add" component={AddProject} />
                                            <Route exact path="/projects/edit/:id" render={(props)=>
                                                <EditProject {...props} />
                                            } />

                                            <Route  path="/users" component={Users} />
                                            <Route path="/roles" component={Roles} />
                                            <Route path="/genres" component={Genre} />
                                            <Route path="/category-ages" component={Genre} />
                                            <Route path="/movies-main" component={MoviesMain} />
                                            <Route path="/search-result" component={SearchResult} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </BrowserRouter>
                </Provider>
            </Fragment>
        </DocumentMeta>
        )
}
export default App;
