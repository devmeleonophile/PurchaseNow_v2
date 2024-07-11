import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlices.js"; // Note the corrected import path

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method : 'POST',
        body : data
      }),
    }),
    logout: builder.mutation({
      query : ()=>({
      url: `${USERS_URL}/logout`,
      method : 'POST',
      })
     }),
     signup: builder.mutation({
      query : (data)=>({
      url: `${USERS_URL}`,
      method : 'POST',
      body : data
      })
     })
    
  }),
//   overrideExisting: false, // Ensure existing endpoints are not overridden
});


export const { useLoginMutation, useLogoutMutation, useSignupMutation} = userApi;
