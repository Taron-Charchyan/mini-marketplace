import api from "../../Api";
import {toast} from "react-toastify";
import {myProductsError, myProductsRequest, myProductsSuccess} from "../action/myProductsActions";

export const getMyProducts = () => {
    return async (dispatch) => {
        dispatch(myProductsRequest());

        try{
            const {data} = await api.get(`/products/my`);

            dispatch(myProductsSuccess(data.products));

            toast.success("Products loaded");
        }catch(error){
            const message = error.response?.data?.message || error.message || "Something went wrong";
            dispatch(myProductsError(message));
            toast.error(message);
        }
    }
}
