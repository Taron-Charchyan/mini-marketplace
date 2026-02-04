export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const registerRequest = () => ({
    type: REGISTER_REQUEST,
});

export const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data,
});

export const registerError = (error) => ({
    type: REGISTER_ERROR,
    payload: error,
});