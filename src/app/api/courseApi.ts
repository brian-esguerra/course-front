import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Tipado básico del curso
export interface Professor {
  id: number;
  name: string;
  email?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  professor: Professor;
  isEnrolled?: boolean;
}

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/courses" }),
  endpoints: (builder) => ({
    // Listar todos los cursos
    getCourses: builder.query<Course[], void>({
      query: () => "/",
    }),

    // Listar curso por ID
    getCourseById: builder.query<Course[], number>({
      query: (id) => `/${id}`,
    }),

    // Listar cursos de un usuario
    getUserCourses: builder.query<Course[], number>({
      query: (userId) => `/user/${userId}`,
    }),

    // Listar todos los cursos con estado de inscripción
    getCoursesWithStatus: builder.query<Course[], number>({
      query: (userId) => `/with-status/${userId}`,
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetUserCoursesQuery,
  useGetCoursesWithStatusQuery,
} = courseApi;
