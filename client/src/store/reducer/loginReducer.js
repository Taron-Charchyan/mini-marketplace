import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
} from "../action/loginAction";

const initialState = {
    user: null,
    loading: false,
    error: null
};

export default function loginReducer(state = initialState, action) {
    switch(action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}
