import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlices.js"; // Note the corrected import path

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCT_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails : builder.query({
      query : (productId) =>({
           url : `${PRODUCT_URL}/${productId}`
      }),
    })
  }),
  overrideExisting: false, // Ensure existing endpoints are not overridden
});


export const { useGetProductsQuery,useGetProductDetailsQuery } = productApi;
