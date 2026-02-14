import api from "../../Api";
import {toast} from "react-toastify";
import {myProductsError, myProductsRequest, myProductsSuccess} from "../action/myProductsAction";
import {productByIdError, productByIdRequest, productByIdSuccess} from "../action/prByIdAction";
import {addProductError, addProductRequest, addProductSuccess} from "../action/addProductAction";

export const getMyProducts = () => {
    return async (dispatch) => {
        dispatch(myProductsRequest());

        try {
            const {data} = await api.get('/products/my');

            dispatch(myProductsSuccess(data.products));

        } catch(error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            dispatch(myProductsError(message));
            toast.error(message);
        }
    }
}

export const getProductById = (id) => {
    return async (dispatch) => {
        dispatch(productByIdRequest());

        try {
            const {data} = await api.get(`/products/getById/${id}`);

            dispatch(productByIdSuccess(data.product));
        } catch(error) {
            const message = error.response?.data?.message || error.message || "Something went wrong";
            dispatch(productByIdError(message));
            toast.error(message);
        }
    }
}

export const addProduct = (formDataToSend) => {
    return async (dispatch) => {
        dispatch(addProductRequest());
        try {
            const response = await api.post('/products/add', formDataToSend);

            dispatch(addProductSuccess(response.data));
            toast.success('Product added successfully!');

            dispatch(getMyProducts());

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to add product';
            dispatch(addProductError(message));
            toast.error(message);
            return { success: false };
        }
    }
}