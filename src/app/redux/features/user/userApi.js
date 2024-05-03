import apiSlice from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => "/currentuser",
    }),
  }),
});

export const {useGetCurrentUserQuery} = userApi;
