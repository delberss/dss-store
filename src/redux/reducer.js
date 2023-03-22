import { combineReducers } from "redux";
import userReducer from "./user/slice";

const reducer = combineReducers({
    userReducer,
})

export default reducer;