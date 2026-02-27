import {
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
} from "../thunk/productsThunks";

const initialState = {
    product: null,
    loading: false,
    error: null
};

export default function addProductReducer(state = initialState, action) {
    switch(action.type) {
        case ADD_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null };
        case ADD_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case ADD_PRODUCT_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
