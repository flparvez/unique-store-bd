import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://uniquestorebd-api.vercel.app/api/' }),
  tagTypes: ['Product', 'Cart'],
  endpoints: (builder) => ({

    addProduct: builder.mutation({
      query: ({ body}) => ({
        url: `products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
    
    editProduct: builder.mutation({
      query: ({ updatedProduct, id }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
    getProducts: builder.query({
      query: () => 'products',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getProductBySlug: builder.query({
      query: (productSlug) => `products/${productSlug}`,
      providesTags: (result, error, productSlug) => [{ type: 'Product', id: productSlug }],
    }),
        getProductByCategorySlug: builder.query({
      query: (productSlug) => `products/category/${productSlug}`,
      providesTags: (result, error, productSlug) => [{ type: 'Product', id: productSlug }],
    }),
    

    deleteProduct: builder.mutation({
      query: ({id}) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),


  }),
});

export const {
  useGetProductsQuery,
  useGetProductBySlugQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
useGetProductByCategorySlugQuery
} = productsApi;
