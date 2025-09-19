import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export interface User {
  id: number;
  name: string;
  email: string;
  idNumber: string;
  createdAt: string;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/users",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Obtener todos los usuarios
    getUsers: builder.query<User[], void>({
      query: () => "/",
      providesTags: ["User"],
    }),

    // Obtener un usuario por ID
    getUserById: builder.query<User, number>({
      query: (id) => `/${id}`,
      providesTags: ["User"],
    }),

    // Actualizar un usuario
    updateUser: builder.mutation<any, { id: number; name: string; idType: string; idNumber: string }>({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),

    // Eliminar un usuario
    deleteUser: builder.mutation<any, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
