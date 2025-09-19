import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const assignApi = createApi({
  reducerPath: "assignApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/assign",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // POST: asignar curso a usuario
    assignCourse: builder.mutation<
      any,
      { userId: number; courseId: number }
    >({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
    }),

    // GET: verificar si un usuario ya está asignado a un curso
    checkAssignment: builder.query<
      { assigned: boolean; assignment?: any },
      { userId: number; courseId: number }
    >({
      query: ({ userId, courseId }) => `/check/${userId}/${courseId}`,
    }),

    // GET: listar usuarios asignados a un curso
    getUsersByCourse: builder.query<any[], number>({
      query: (courseId) => `/course/${courseId}`,
    }),
  }),
});

export const {
  useAssignCourseMutation,
  useCheckAssignmentQuery,
  useGetUsersByCourseQuery,
} = assignApi;
