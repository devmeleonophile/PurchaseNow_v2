import { apiSlice } from "./apiSlices";
import { ORDERS_URL, PAYPAL_URL } from "../constants";

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
        }),
        payOrder : builder.mutation({
            query : ({orderId, details} ) =>({
                url : `${ORDERS_URL}/${orderId}/pay`,
                method : 'PUT',
                body : {...details}
            })
        }),
        getPayPalClientId : builder.query({
            query : ()=>({
                url : `${PAYPAL_URL}`
            }),
            keepUnusedDataFor : 5
        })
       
    })
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery, usePayOrderMutation, useGetPayPalClientIdQuery} = orderApiSlice;
