import { apiSlice } from "./apiSlice";

export const timeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAlltimes: builder.query({
      query: () => ({
        url: `/api/time`,
      }),
    }),
  }),
});

export const { useGetAlltimesQuery } = timeApi;
