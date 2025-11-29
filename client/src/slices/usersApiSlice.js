// client/src/slices/usersApiSlice.js
import { USERS_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    
    // --- NEW: Get Users Query (For Admin) ---
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    // ----------------------------------------
  }),
});

// Export the new hook
export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetUsersQuery 
} = usersApiSlice;