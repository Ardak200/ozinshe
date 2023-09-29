import { SUCCESS_SUFFIX } from "redux-axios-middleware";

import axios from "axios";
import cookie from "js-cookie";

const CATEGORY_LIST = 'CATEGORY_LIST';
const ADD_CATEGORY = 'ADD_CATEGORY';
const DELETED_CATEGORY='DELETED_CATEGORY';

const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case CATEGORY_LIST + SUCCESS_SUFFIX:
            return action.payload.data;

        case DELETED_CATEGORY:


        default:
            return state;
    }
}

export default categoriesReducer;

export const allCategories = () => ({
    type: CATEGORY_LIST,
    payload: {
        request: {
            url: `${process.env.REACT_APP_API_URL}/core/genres`,
        },
    },
});

export const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API_ENDPOINT}`,
    timeout:5000,
    headers: {'Authorization': 'Bearer '+cookie.get("token")},
    withCredentials:true,
    data: {},
})
