import { apiSlice } from "./apiSlices";
import { ORDERS_URL } from "../constants";

const orderApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        createOrder : builder.mutation({
            query : (orders)=>({
                url : ORDERS_URL,
                method : 'POST',
                body : orders
            })

        }),
        getOrderDetails : builder.query({
           query : (orderId)=>({
              url : `${ORDERS_URL}/${orderId}`
           }),
           keepUnusedDataFor : 5
        })
       
    })
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery} = orderApiSlice;
