import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: (builder) => ({
    signup: builder.mutation<any, { name: string; email: string; password: string; idType: string; idNumber: string; role: string }>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation<any, { email: string; password: string }>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
