import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const planApi = createApi({
  reducerPath: "planApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }),
  endpoints: (builder) => ({
    getPlans: builder.query<any[], void>({
      query: () => "/plans",
    }),
    assignPlan: builder.mutation<any, { userId: number; planId: number }>({
      query: (body) => ({
        url: "/plans/assign",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetPlansQuery, useAssignPlanMutation } = planApi;
