import api from "../../Api";
import {toast} from "react-toastify";

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_ERROR = "ADD_PRODUCT_ERROR";

export const MY_PRODUCTS_REQUEST = "MY_PRODUCTS_REQUEST"
export const MY_PRODUCTS_SUCCESS = "MY_PRODUCTS_SUCCESS"
export const MY_PRODUCTS_ERROR = "MY_PRODUCTS_ERROR"

export const PRODUCT_BY_ID_REQUEST = "PRODUCT_BY_ID_REQUEST";
export const PRODUCT_BY_ID_SUCCESS = "PRODUCT_BY_ID_SUCCESS";
export const PRODUCT_BY_ID_ERROR = "PRODUCT_BY_ID_ERROR";

export const getMyProducts = () => {
    return async (dispatch) => {
        dispatch({
            type: MY_PRODUCTS_REQUEST
        });

        try {
            const {data} = await api.get('/products/my');

            dispatch({
                type: MY_PRODUCTS_SUCCESS,
                payload: data.products
            });

        } catch(error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            dispatch({
                type: MY_PRODUCTS_ERROR,
                payload: message
            });
            toast.error(message);
        }
    }
}

export const getProductById = (id) => {
    return async (dispatch) => {
        dispatch({
            type: PRODUCT_BY_ID_REQUEST
        });

        try {
            const {data} = await api.get(`/products/getById/${id}`);

            dispatch({
                type: PRODUCT_BY_ID_SUCCESS,
                payload: data.product
            });
        } catch(error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            dispatch({
                type: PRODUCT_BY_ID_ERROR,
                payload: message
            });
            toast.error(message);
        }
    }
}

export const addProduct = (formDataToSend) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_PRODUCT_REQUEST
        });
        try {
            const response = await api.post('/products/add', formDataToSend);

            dispatch({
                type: ADD_PRODUCT_SUCCESS,
                payload: response.data
            });
            toast.success('Product added successfully!');

            dispatch(getMyProducts());

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to add product';
            dispatch({
                type: ADD_PRODUCT_ERROR,
                payload: message
            });
            toast.error(message);
            return { success: false };
        }
    }
}