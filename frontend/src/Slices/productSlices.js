import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlices.js"; 

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      providesTags:['Products'],
      keepUnusedDataFor: 5,
    }),
    getProductDetails : builder.query({
      query : (productId) =>({
           url : `${PRODUCT_URL}/${productId}`
      }),
      providesTags:['Products'],
    }),
    createProducts : builder.mutation({
      query : ()=>({
        url : PRODUCT_URL,
        method : "POST"
      }),
      invalidatesTags:["Products"]
    }),
    updateProduct : builder.mutation({
      query : (data) => ({
        url : `${PRODUCT_URL}/${data.productId}`,
        method : "PUT",
        body : data
      }),
      invalidatesTags:["Products"]
    })
  }),
  overrideExisting: false, 
});


export const { useGetProductsQuery,useGetProductDetailsQuery, useCreateProductsMutation, useUpdateProductMutation } = productApi;
