import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://Unique Store BD-api.vercel.app/api/'  }),
  // baseQuery: fetchBaseQuery({ baseUrl: 'https://Unique Store BD-api.vercel.app/api/'  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({

    getCategories: builder.query({
      query: () => 'categories',
      providesTags: [{ type: 'Category', id: 'LIST' }],
    }),

    addCategory: builder.mutation({
      query: ({body}) => ({
        url: `https://Unique Store BD.vercel.app/api/category`,
        method: 'POST',
        body:body,
      }),
      invalidatesTags: [{ type: 'Category' }],
    }),
       // Query for getting single category
       getCategoryById: builder.query({
        query: (slug) => ({
          url: `categories/${slug}`,
        }),
        providesTags: [{ type: 'Category', id: 'LIST' }],
      }),
 // Edit Category
 editCategory: builder.mutation({
  query: ({ slug, updatedCategory }) => ({
    url: `https://Unique Store BD.vercel.app/api/category/${slug}`,
    method: 'PATCH',
    body: updatedCategory,
  }),
  invalidatesTags: [{ type: 'Category', id: 'LIST' }],
}),

// / delete category by id and userId
    deleteCategory: builder.mutation({
      query: ({id}) => ({
        // url: `order/${id}`,
        url: `categories/${id}`,
       
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Category', id: 'LIST' }, { type: 'Category' }],
    }),

  }),
});

export const { useGetCategoriesQuery, useAddCategoryMutation,useEditCategoryMutation,useGetCategoryByIdQuery ,useDeleteCategoryMutation} = categoryApi;
