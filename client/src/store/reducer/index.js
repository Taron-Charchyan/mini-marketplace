import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import myProductsReducer from "./myProductsReducer";

export default combineReducers({
    register: registerReducer,
    login: loginReducer,
    myProducts: myProductsReducer,
})