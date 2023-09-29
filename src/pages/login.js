import React,{useState} from "react";
import {fetchCurrentUser, loginUser} from "../redux/actions/user";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import disableScroll from "disable-scroll";
import {useHistory} from "react-router-dom";
import cookie from "js-cookie";

class Login extends React.Component {
    state = {email: "", password: ""}
    componentDidMount() {
        if(cookie.get("token")) {
            this.props.fetchCurrentUser()
        }

        disableScroll.on();
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state.email, this.state.password);
    }
    render() {
        return this.props.loggedIn ? (
            <Redirect to="/projects" />
        ) : (
            <div className="login">
                <div className="login--form m-auto">
                    <img className="d-block m-auto" src="/img/loginicon.png"/>
                    <form onSubmit={e => this.handleSubmit(e)} className="d-block m-auto">
                        <div className="form-top text-center">
                            <h1 className="heading">Добро пожаловать</h1>
                            <p>Войдите в систему, чтобы продолжить</p>
                            {/*{error &&*/}
                            {/*<p className="alert alert-danger">{error}</p>}*/}
                        </div>
                        <div className="form-group">
                            <input name="email" type="text"
                                   value={this.state.email}
                                   placeholder="Email"
                                   onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <input name="password" type="password"
                                   value={this.state.password}
                                   placeholder="Пароль"
                                   onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" disabled={this.props.authenticatingUser}>{this.props.authenticatingUser ? 'Загрузка..' : 'Войти'}</button>
                        </div>

                        <p className="text-center">Забыли пароль? <a href="#">Восстановить</a></p>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    usersReducer: {
        authenticatingUser, failedLogin, error, loggedIn,
    },
    }) => ({
        authenticatingUser,
        failedLogin,
        error,
        loggedIn,
});

export default connect(mapStateToProps, {loginUser,fetchCurrentUser})(Login);