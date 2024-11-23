import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API
export const checkoutApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://uniquestorebd-api.vercel.app/api/' }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({

    // Mutation for adding an order
    addOrder: builder.mutation({
      query: (body) => ({
        url: 'order',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    // Edit Order

    editOrder: builder.mutation({
      query: ({ id, updatedOrder }) => ({
        url: `/order/${id}`,
        method: 'PATCH',
        body: updatedOrder,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    // Query for getting orders
    getOrders: builder.query({
      query: (id) => ({
        url: `order?userId=${id}`,
      }),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
        // Query for getting single order
    getOrderById: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    // delete order by id and userId
    deleteOrder: builder.mutation({
      query: ({id,userId}) => ({
        // url: `order/${id}`,
        url: `order/${id}?userId=${userId}`,
       
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }, { type: 'Order' }],
    }),

  }),
});

export const { useAddOrderMutation, useGetOrdersQuery,useGetOrderByIdQuery,useEditOrderMutation,useDeleteOrderMutation } = checkoutApi;
