import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:4000/api/v1",
    baseUrl: "https://comment-section-server.onrender.com/api/v1",
  }),
  endpoints: (builder) => ({}),
});

export default apiSlice;