/* eslint-disable no-use-before-define */
/* eslint arrow-parens: [2, "as-needed"] */
import cookie from "js-cookie";
import axios from "axios";
import { Redirect } from 'react-router';
import {axiosInstance} from "../../modules/categories";
import simpleToaster from "simple-toaster";

export const loginUser = (email, password) => dispatch => {
    dispatch({ type: 'AUTHENTICATING_USER' });
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}/auth/V1/signin`, {
        email: email,
        password: password
    })
        .then(res=> {
            cookie.set("token", res.data.accessToken);
            dispatch({ type: 'SET_CURRENT_USER', payload: res.data });
            location.reload();

        })
        .catch(err=> {
            dispatch({type: "FAILED_LOGIN", payload: "Неправильный логин или пароль"})
            simpleToaster("error", "Неправильный логин или пароль")
        })
    // fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/V1/signin`, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         Accept: 'application/json',
    //     },
    //     body: JSON.stringify({
    //             email,
    //             password,
    //     }),
    // })
    //     .then(response => {
    //         if (response.ok) {
    //             return response.json();
    //         }
    //         throw response;
    //     })
    //     .then(JSONResponse => {
    //         cookie.setItem('token', JSONResponse.jwt);
    //         dispatch({ type: 'SET_CURRENT_USER', payload: JSONResponse.user });
    //     })
    //     u.catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })));
};


export const fetchCurrentUser = () => dispatch => {
    dispatch(authenticatingUser());
    axiosInstance.get("/core/V1/user/profile")
        .then(res=> {
            dispatch(setCurrentUser(res.data))
        })
        .catch(err=> {
            cookie.remove("token")
        })
};

export const setCurrentUser = userData => ({
    type: 'SET_CURRENT_USER',
    payload: userData,
});

export const logoutUser = () => ({
    type: 'LOGOUT_USER',
});

export const failedLogin = errorMsg => ({
    type: 'FAILED_LOGIN',
    payload: errorMsg,
});

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER' });