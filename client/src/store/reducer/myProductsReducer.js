import {
    MYPRODUCTS_REQUEST,
    MYPRODUCTS_SUCCESS,
    MYPRODUCTS_ERROR,
} from "../action/myProductsAction";

const initialState = {
    products: [],
    loading: false,
    error: null
};

export default function myProductsReducer(state = initialState, action) {
    switch(action.type) {
        case MYPRODUCTS_REQUEST:
            return { ...state, loading: true, error: null };
        case MYPRODUCTS_SUCCESS:
            return { ...state, loading: false, products: action.payload };
        case MYPRODUCTS_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
