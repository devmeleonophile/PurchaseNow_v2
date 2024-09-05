import { PRODUCT_URL , UPLOAD_URL} from "../constants";
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
    }),
    uploadProductImage : builder.mutation({
      query : (data)=>({
        url : `${UPLOAD_URL}`,
        method : "POST",
        body : data
      })
    }),
    deleteProduct : builder.mutation({
      query : (productId) =>({
        url : `${PRODUCT_URL}/${productId}`,
        method : 'DELETE'
      }),
    })
  }),
  overrideExisting: false, 
});


export const { useGetProductsQuery,useGetProductDetailsQuery, useCreateProductsMutation, 
  useUpdateProductMutation,useUploadProductImageMutation, useDeleteProductMutation } = productApi;
