import { apiSlice } from "./apiSlice";

export const planApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlansByCategory: builder.query({
      query: (id) => ({
        url: `/api/category/plans/${id}`,
      }),
    }),
    getPlanById: builder.query({
      query: (id) => ({
        url: `/api/plans/${id}`,
      }),
    }),
  }),
});

export const { useGetPlansByCategoryQuery, useGetPlanByIdQuery } = planApi;
