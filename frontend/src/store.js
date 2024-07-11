import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlices";
import { cartReducer } from "./Slices/cartSlices";
import authSlice from "./Slices/authSlice";
const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartReducer,
        auth : authSlice

    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

export default store;