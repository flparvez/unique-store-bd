import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://uniquestorebd-api.vercel.app/api/' }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:5000/api/' }),
  tagTypes: ['Product', 'Cart'],
  endpoints: (builder) => ({

    addProduct: builder.mutation({
      query: ({ body}) => ({
        url: `https://uniquestorebd.vercel.app/api/product`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
    
    updateProduct: builder.mutation({
      query: ({ updatedProduct, id }) => ({
        // url: `http://localhost:3000/api/product/${id}`,
        url: `http://localhost:3000/api/product/${id}`,
        method: 'PATCH',
        body: updatedProduct,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
    getProducts: builder.query({
      query: () => 'products',
      providesTags: [{ type: 'Product', id: 'LIST' }],
    }),

    getProductById: builder.query({
  
      query: (productId) => `products/${productId}`,
      // providesTags: (result, error, productSlug) => [{ type: 'Product', id: productSlug }],
    }),

       getProductBySlug: builder.query({
      query: (productSlug) => `products/slug/${productSlug}`,
      providesTags: ( productSlug) => [{ type: 'Product', id: productSlug }],
    }),

    

    deleteProduct: builder.mutation({
      query: ({id}) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }, { type: 'Cart' }],
    }),
// fetch product from search query


  fetchProductsFromSearchQuery: builder.query({
    query: (query) => `products/search?query=${query}`,
    providesTags: (result, error, query) => [{ type: 'Product', id: query }],
  }),

  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
useFetchProductsFromSearchQueryQuery,
useGetProductBySlugQuery
} = productsApi;