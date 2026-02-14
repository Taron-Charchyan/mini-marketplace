export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";

export const addProductRequest = () => ({
    type: ADD_PRODUCT_REQUEST,
});

export const addProductSuccess = (data) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: data,
});

export const addProductError = (error) => ({
    type: ADD_PRODUCT_ERROR,
    payload: error,
});