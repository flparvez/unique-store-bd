import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define the API
export const checkoutApi = createApi({
  reducerPath: 'orders',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://Unique Store BD-api.vercel.app/api/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://Unique Store BD-api.vercel.app/api/' }),

  tagTypes: ['Order'],
  endpoints: (builder) => ({

    // Mutation for adding an order
    addOrder: builder.mutation({
      query: (body) => ({
        url: 'orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),

    // Edit Order

    editOrder: builder.mutation({
      query: ({ id, updatedOrder }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: updatedOrder,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    // Query for getting orders
    getOrders: builder.query({
      query: () => ({
        url: `orders`,
      }),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
        // Query for getting single order
    getOrderById: builder.query({
      query: (id) => ({
        url: `orders/${id}`,
      }),
      providesTags: [{ type: 'Order', id: 'LIST' }],
    }),
    // delete order by id and userId
    deleteOrder: builder.mutation({
      query: ({id}) => ({
        // url: `order/${id}`,
        url: `orders/${id}`,
       
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }, { type: 'Order' }],
    }),

  }),
});

export const { useAddOrderMutation,useGetOrderByIdQuery,useEditOrderMutation,useDeleteOrderMutation,useGetOrdersQuery } = checkoutApi;
