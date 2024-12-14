import { combineReducers } from "redux";
import CartSlice from "./reducers/CartSlice";
import refreshLoginSlice from "./reducers/refreshLoginSlice";


const RootReducer = combineReducers({
    Auth : refreshLoginSlice,
    Cart : CartSlice,
})


export default RootReducer;