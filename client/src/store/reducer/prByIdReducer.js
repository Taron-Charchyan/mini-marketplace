import {
    PRODUCT_BY_ID_REQUEST,
    PRODUCT_BY_ID_SUCCESS,
    PRODUCT_BY_ID_ERROR
} from "../thunk/productsThunks";

const initialState = {
    product: null,
    loading: false,
    error: null
};

export default function productByIdReducer(state = initialState, action) {
    switch(action.type) {
        case PRODUCT_BY_ID_REQUEST:
            return { ...state, loading: true, error: null };
        case PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case PRODUCT_BY_ID_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
