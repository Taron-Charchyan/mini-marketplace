import api from "../../Api";
import {registerError, registerRequest, registerSuccess} from "../action/registerActions";
import {toast} from "react-toastify";
import {loginError, loginRequest, loginSuccess} from "../action/loginActions"; // проверь этот импорт

export const register = (formData) => {
    return async (dispatch) => {
        dispatch(registerRequest());
        try {
            const {data} = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            dispatch(registerSuccess(data.user));

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success(data.message || "User registered successfully.");
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            dispatch(registerError(message));
            toast.error(message);
        }
    };
};

export const login = (formData) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try {
            const {data} = await api.post('/auth/login', {
                email: formData.email,
                password: formData.password,
            });

            dispatch(loginSuccess(data.user));

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            toast.success(data.message || "Welcome back!");
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            dispatch(loginError(message));
            toast.error(message);
        }
    }
}