import {
    MY_PRODUCTS_REQUEST,
    MY_PRODUCTS_SUCCESS,
    MY_PRODUCTS_ERROR,
} from "../thunk/productsThunks";

const initialState = {
    products: [],
    loading: false,
    error: null
};

export default function myProductsReducer(state = initialState, action) {
    switch(action.type) {
        case MY_PRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case MY_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case MY_PRODUCTS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
