import axios from "axios";
import {SIGNUP, LOGIN, GET_USER, LOGOUT} from "./actionTypes.js";

const initialState = {
    user: {},
    error: false,
    redirect: false
};

//ACTIONS------------------------------

export const signup = (username, password) => {
    let data = axios.post("/api/signup", {username, password}).then(res=>res.data)
    return{
        type: SIGNUP,
        payload: data
    }
};

export const login = (username, password) => {
    let data = axios.post(`/api/login`, {username, password}).then(res => res.data)
    return {type: LOGIN, payload: data};
};

export const logout = () => {
    let data = axios.delete("/api/logout").then(res => res.data)
    return {type: LOGOUT, payload: data};
};

export const getUser = () => {

    let data = axios.get("/api/getUser").then(res => res.data)
    return {type: GET_USER, payload: data};
};

export default function (state = initialState, action){
    let {type, payload} = action;
    switch(type){
        case SIGNUP + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case SIGNUP + "_REJECTED":
            return { ...state, error: payload };

        case LOGIN + "_FULFILLED":
            return { ...state, user: payload, redirect: false, error: false };
        case LOGIN + "_REJECTED":
                    return { ...state, error: payload};

        case GET_USER + "_FULFILLED":
            return {...state, user: payload};
        case GET_USER + "_REJECTED":
            return {...state, error: payload}

        case LOGOUT + "_FULFILLED":
                return {...state, ...initialState};
        case LOGOUT + "_REJECTED":
            return {...state, error: payload}

        default:
            return state;
    }
}