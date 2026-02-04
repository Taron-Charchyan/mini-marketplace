const {registerRequest, registerSuccess, registerError} = require("../action/registerActions");
const {toast} = require("react-toastify");

export const register = (formData, navigate) => {
    return async (dispatch) => {
        dispatch(registerRequest());
        try {
            let api;
            const response = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            dispatch(registerSuccess(response.data.user));

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            toast.success(response.data.message || "Успешная регистрация!");

            if (navigate) navigate("/");

        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            dispatch(registerError(message));
            toast.error(message);
        }
    };
};
