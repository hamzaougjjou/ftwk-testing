import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "./reducers/CartSlice";
import refreshLoginSlice from "./reducers/refreshLoginSlice";



let store = configureStore( {
    reducer:{
        Auth : refreshLoginSlice,
        Cart : CartSlice,
    }
} );

export default store;