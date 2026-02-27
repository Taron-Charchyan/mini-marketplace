import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_ERROR
} from "../thunk/authThunks";

const initialState = {
    user: null,
    loading: false,
    error: null
};

export default function registerReducer(state = initialState, action) {
    switch(action.type) {
        case REGISTER_REQUEST:
            return { ...state, loading: true, error: null };
        case REGISTER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case REGISTER_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
