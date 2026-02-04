import api from "../../Api";
import {registerError, registerRequest, registerSuccess} from "../action/registerActions";
import {toast} from "react-toastify";
import {loginError, loginRequest} from "../action/loginActions";

export const register = (formData, navigate) => {
    return async (dispatch) => {
        dispatch(registerRequest());
        try {
            const response = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            dispatch(registerSuccess(response.data.user));

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success(response.data.message || "User registered successfully.");

            if (navigate) navigate("/");
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            dispatch(registerError(message));
            toast.error(message);
        }
    };
};

export const login = (formData, navigate) => {
    return async (dispatch) => {
        dispatch(loginRequest());
        try{
            const response = await api.post('/auth/login', {
                name: formData.name,
                email: formData.email,
            })

            dispatch(registerSuccess(response.data.user));

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            if (navigate) navigate("/");
        }catch(error){
            const message = error.response?.data?.message || error.message || 'Login failed';
            dispatch(loginError(message));
            toast.error(message);
        }
    }
}