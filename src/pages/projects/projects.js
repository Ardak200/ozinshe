import {Fragment, useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {axiosInstance} from "../../modules/categories";
import withAuth from "../../hoc/withAuth";
import useQuery from "../../defaults/useQuery";
import Pagination from 'react-js-pagination'
import {handleRemove} from "../../redux/actions/projects";
import {sliceText} from "../../defaults/sliceText";
const Projects = () => {
    const [pagination,setPagination] = useState({
        totalPages: 0,
        last: false,
        first: false,
        totalElements: 0,
        size:0,
    })
    const history = useHistory();
    const query = useQuery();
    const handleOnClick = useCallback(() => history.push('/projects/add'), [history]);
    const [loading,setLoading] = useState(false)
    const [projects, setProjects] = useState([])
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState(query.get("categoryId") == null ? "" : query.get("categoryId"))
    const [year,setYear] = useState(query.get("year") == null ? "" : query.get("year"))
    const [years, setYears] = useState([]);


    const currentPage = query.get("page") == null ? "1" : query.get("page")

    const[selectedMovieType, setSelectedMovieType] = useState(query.get("type") === null ? "" : query.get("type"))
    const [sortField, setSortField] = useState(query.get("sortField") === null ? "" : query.get("sortField"))

    useEffect(() => {
        setSelectedMovieType(query.get("type") == null ? "" : query.get("type"))
    },[query])

    useEffect(() => {
        if(loading === false) {
            getAllMovies(20, parseInt(currentPage) - 1, selectedMovieType, categoryId, year, sortField)
            axiosInstance.get("/core/V1/categories").then(
                res => {
                    setCategories(res.data)
                }
            )


            axiosInstance.get("/core/V1/year/list").then(
                res => {
                    setYears(res.data)
                }
            )
        }
    },[loading])

    const handleChangePage = pageNumber => {

            history.push({pathname: "/projects", search: `?page=${pageNumber}&type=${selectedMovieType}&categoryId=${categoryId}&year=${year}&sortField=${sortField}`})
            getAllMovies(20,parseInt(pageNumber)-1, selectedMovieType, categoryId,year, sortField);
    }

    const handleYear = e => {
        const selectedYear = e.target.value;
        setYear(selectedYear)
        history.push({pathname: "/projects", search: `?page=${1}&type=${selectedMovieType}&categoryId=${categoryId}&year=${selectedYear}&sortField=${sortField}`})
        getAllMovies(20,parseInt(currentPage)-1, selectedMovieType, categoryId,selectedYear, sortField);

    }
    const handleChangeCategory = e => {
        const selectedCategory = e.target.value
        setCategoryId(selectedCategory)
        history.push({pathname: "/projects", search: `?page=${1}&type=${selectedMovieType}&categoryId=${selectedCategory}&year=${year}&sortField=${sortField}`})
        getAllMovies(20, parseInt(currentPage)-1,selectedMovieType,selectedCategory,year, sortField)
    }

    const handleChangeMovieType = e => {
        const selectedMovie = e.target.value;
        setSelectedMovieType(e.target.value)
        history.push({pathname: "/projects", search: `?page=${1}&type=${selectedMovie}&categoryId=${categoryId}&year=${year}&sortField=${sortField}`})
        getAllMovies(20, parseInt(currentPage)-1, selectedMovie, categoryId,year, sortField)
    }

    const getAllMovies = (size,page,movieType,selectedCategory,selectedYear, sortingField) => {
            axiosInstance.get("/core/V1/movies/page", {params: {
                    size:size,
                    page:page,
                    type: movieType,
                    categoryId: selectedCategory == "" ? null : parseInt(selectedCategory),
                    year:selectedYear=="" ? null : parseInt(selectedYear),
                    sortField: sortingField,
                    direction: sortingField === "name" ? "ASC": "DESC"
            }
            })
            .then(res=> {
                setProjects(res.data.content)
                setPagination({
                    totalPages: res.data.totalPages,
                    first: res.data.first,
                    last: res.data.last,
                    totalElements: res.data.totalElements,
                    size: res.data.size
                })
            })
    }

    const sortingFields = (field, pageNum) => {
        setSortField(field)

        if(pageNum === undefined){
            pageNum = 1
        }
        history.push({pathname: "/projects", search: `?page=${1}&type=${selectedMovieType}&categoryId=${categoryId}&year=${year}&sortField=${field}`})
        getAllMovies(20,0,selectedMovieType,categoryId,year, field)
    }



    return (
        <Fragment>
            <div className="d-flex content-header justify-content-between">
                <div className="d-flex align-items-center">
                    <h2 className="heading">Проекты <span className="count">{pagination.totalElements}</span> </h2>
                </div>
                <button className="btn addBtn primary-button" onClick={handleOnClick}><img src="/img/plus.svg"/><p>Добавить</p></button>
            </div>
            <div className="filter-block">
                <div className="filter-items">
                    <div className="filter-item ">
                        <div className="filter-select">
                            <span>
                                Сортировать:
                            </span>
                            <select value={sortField} onChange={e => sortingFields(e.target.value)}>
                                <option value={"createdDate"}>По дате регистрации</option>
                                <option value={"lastModifiedDate"}>По дате обновления</option>
                                <option value={"name"}>По имени</option>
                            </select>
                            <img src="/img/triangle-arrow.svg"/>
                        </div>

                    </div>
                    <div className="filter-item">
                        <div className="filter-select">
                             <span>
                        Категория:
                    </span>
                            <select  value={categoryId} onChange={e =>{handleChangeCategory(e)
                            }} className="ml-2 ">
                                <option value={''}>Все категории</option>
                                {categories.map(c =>(
                                    <option value={c.id} >
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <img src="/img/triangle-arrow.svg"/>
                        </div>

                    </div>
                    <div className="filter-item">
                        <div className="filter-select">
                              <span>
                                  Тип:
                              </span>
                                <select className="ml-2" value={selectedMovieType} onChange={e => handleChangeMovieType(e)}>
                                    <option value={""}>{"Все" + "            "}</option>
                                    <option value={"MOVIE"}>Фильмы</option>
                                    <option value={"SERIAL"}>Сериалы</option>
                                </select>
                                <img className="type-img" src="/img/triangle-arrow.svg"/>
                        </div>

                    </div>
                </div>
                <div className="year-picker">
                    <img className="year-img" src="/img/grey-clock.svg"/>
                    <div className="filter-item">
                        <select value={year} onChange={e=>handleYear(e)} className="year">
                            <option value={""}>Выберите год</option>
                            {years.map(
                                y => (
                                    <option value={y}>{y}</option>
                                )
                                )
                            }
                        </select>
                    </div>
                </div>
            </div>

            <div className="d-flex  flex-wrap">
                {projects.map(p=> (
                    <div className="projectlist">
                        <div className="card-block project-card">
                            {p.poster === null ? <img className={"project-banner"} onClick={() => history.push(`/projects/${p.id}`)} src="/img/logo.svg" /> :
                        <img className="project-banner" onClick={() => history.push(`/projects/${p.id}`)} src={ p.poster.link} /> }
                            {p.movieType === 'SERIAL' && <div className="season-block">
                                <p>
                                    {p.seriesCount} бөлім
                                </p>
                            </div>}

                            <div>
                            <span onClick={() => history.push(`/projects/${p.id}`)}>
                                {sliceText(p.name,22)}
                            </span>
                            <div className="categoriesList">
                            <ul>
                                {p.categories.map((c,index)=>(
                                    <li className={index>1 && 'd-none'}>{sliceText(c.name,12)}</li>
                                ))}

                            </ul>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex view-out">
                                <img src="/img/eye.svg" className="view"/>
                                <p>{p.watchCount}</p>
                                </div>
                                <div className="modify">
                                    <img className="modify-icons img-right" src="/img/pen.svg" onClick={() => history.push(`/projects/edit/${p.id}`)}/>
                                    <img className="modify-icons" src="/img/delete.svg" onClick={(e) => handleRemove(e,history,setLoading)} data-id={p.id}/>
                                </div>
                            </div>
                        </div>

                        </div>
                    </div>
                ))}

            </div>
            <div className="d-flex justify-content-center">
                {projects.length == 0 && <div className="mt-5">No data found</div>}
                {projects.length > 0 &&
                    <Pagination
                        activePage={parseInt(currentPage)}
                        itemsCountPerPage={pagination.size}
                        totalItemsCount={pagination.totalElements}
                        pageRangeDisplayed={5}
                        itemClass="page-item"
                        linkClass="page-link"
                        onChange={handleChangePage}
                    />
                }

            </div>

        </Fragment>

    )
}

export default withAuth(Projects);