import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Slices/apiSlices";
import { cartReducer } from "./Slices/cartSlices";
const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        cart : cartReducer

    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

export default store;