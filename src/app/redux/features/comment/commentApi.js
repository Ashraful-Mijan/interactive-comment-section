// import endPoints from "@/configs/auth";
import apiSlice from "../api/apiSlice";

export const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "/comment",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "comments", id: _id })),
              { type: "comments", id: "LIST" },
            ]
          : [{ type: "comments", id: "LIST" }],
    }),
    addComment: builder.mutation({
      query: ({ body }) => ({
        url: "/comment",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "comments", id: "LIST" }],
    }),
    addReply: builder.mutation({
      query: ({ body, parentId }) => ({
        url: `/comment/${parentId}`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "comments", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: ({ parentId, replyId }) => ({
        url: `/comment/${parentId}/${replyId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "comments", id: "LIST" }],
    }),
    editComment: builder.mutation({
      query: ({ parentId, replyId, body }) => ({
        url: `/comment/${parentId}/${replyId}`,
        method: "PUT",
        body
      }),
      invalidatesTags: [{ type: "comments", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useAddReplyMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentApi;
