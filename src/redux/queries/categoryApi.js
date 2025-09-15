import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/api/category/all",
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
