import api from "../../Api";
import {toast} from "react-toastify";
import {data} from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const register = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: REGISTER_REQUEST,
        });
        try {
            const {data} = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            dispatch({
                type: REGISTER_SUCCESS,
                payload: data.user,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success(data.message || "User registered successfully.");
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            dispatch({
                type: REGISTER_ERROR,
                payload: message,
            });
            toast.error(message);
        }
    };
};

export const login = (formData) => {
    return async (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST,
        });
        try {
            const {data} = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.user,
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success(data.message || "Welcome back!");
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            dispatch({
                type: LOGIN_ERROR,
                payload: message,
            });
            toast.error(message);
        }
    }
}