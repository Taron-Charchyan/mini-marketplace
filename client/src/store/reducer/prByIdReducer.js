import {
    PRODUCTBYID_REQUEST,
    PRODUCTBYID_SUCCESS,
    PRODUCTBYID_ERROR
} from "../action/prByIdAction";

const initialState = {
    product: null,
    loading: false,
    error: null
};

export default function productByIdReducer(state = initialState, action) {
    switch(action.type) {
        case PRODUCTBYID_REQUEST:
            return { ...state, loading: true, error: null };
        case PRODUCTBYID_SUCCESS:
            return { ...state, loading: false, product: action.payload };
        case PRODUCTBYID_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
