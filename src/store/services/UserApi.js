import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const UserApi = createApi({
  reducerPath: 'UserApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://uniquestorebd-api.vercel.app//' }),
  tagTypes: ['User', 'UserList'],
  endpoints: (builder) => ({



    loginUser: builder.mutation({
      query: (body) => ({
        url: 'auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),

    logoutUser: builder.query({
      query: () => '/api/auth/logout',
      providesTags: [{ type: 'User', id }],
    }),

    getUsers: builder.query({
      query: () => 'auth/',
      providesTags: ['UserList'],
    }),

    getSingleUser: builder.query({
      query: () => 'auth/me',
      providesTags: [{ type: 'User', id }],
    }),



    registerUser: builder.mutation({
      query: (body) => ({
        url: 'auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['UserList'],
    }),

  }),
});

export const {
  useLoginUserMutation,
  useGetUsersQuery,
  useGetSingleUserQuery,
 
  useRegisterUserMutation,
  useLogoutUserQuery
} = UserApi;
