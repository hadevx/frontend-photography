import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders",
        method: "POST",
        body: { ...order },
      }),
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `/api/orders/${id}`,
      }),
    }),
    getMyOrders: builder.query({
      query: (id) => ({
        url: `/api/orders/mine`,
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery, useGetMyOrdersQuery } = orderApi;
