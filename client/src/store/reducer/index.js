import { combineReducers } from "redux";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import myProductsReducer from "./myProductsReducer";
import prByIdReducer from "./prByIdReducer";
import addProductReducer from "./addProductReducer";

export default combineReducers({
    register: registerReducer,
    login: loginReducer,
    myProducts: myProductsReducer,
    productById: prByIdReducer,
    addProduct: addProductReducer,
})