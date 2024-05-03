"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommentList from "./CommentList";
import {
  useAddReplyMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} from "../redux/features/comment/commentApi";
import CommentForm from "./CommentForm";
import timeAgo from "../utils/timeago";
import Input from "./Input";

const Comment = ({ comment, parentId, user }) => {
  const [isReply, setIsReply] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState(comment.content);

  const [addReply, { isLoading, isSuccess }] = useAddReplyMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [editComment, { isLoading: isUpdating, isSuccess: isUpdateSuccess }] =
    useEditCommentMutation();

  const handleDelete = async (replyId) => {
    await deleteComment({ parentId, replyId });
  };

  const handleEdit = async (replyId) => {
    await editComment({ parentId, replyId, body: { content: edit } });
  };

  const onChange = (e) => {
    setEdit(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setIsReply(false);
    }
    if (isUpdateSuccess) {
      setIsEdit(false);
    }
  }, [isSuccess, isUpdateSuccess]);

  return (
    <>
      <div className="bg-white p-5 rounded-md shadow-sm flex flex-col md:flex-row gap-5 relative">
        <div className="flex md:flex-col w-max md:h-max px-2 md:px-2 md:py-2 items-center justify-around rounded-md bg-white-lilac order-2 md:order-1">
          <svg
            width="11"
            height="11"
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z"
              fill="#C5C6EF"
            />
          </svg>
          <span className="text-blue-violet font-medium px-4 md:px-0 py-1 md:py-3">
            10
          </span>
          <svg
            width="11"
            height="3"
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z"
              fill="#C5C6EF"
            />
          </svg>
        </div>
        <div className="flex flex-col gap-3 order-1 md:order-2 flex-1">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div>
                <Image
                  src={comment.user?.image.png}
                  alt={comment.user?.username}
                  width={32}
                  height={32}
                />
              </div>
              <div className="font-medium">{comment.user?.username}</div>
              {user.username === comment.user?.username && (
                <div className="font-medium bg-blue-violet text-white-lilac px-2 rounded">
                  You
                </div>
              )}
              <div className="text-pale-sky font-normal">
                {timeAgo(new Date(comment.createdAt))}
              </div>
            </div>
            <div className="absolute md:static bottom-6 right-5">
              {user.username !== comment.user?.username ? (
                <button
                  className="text-blue-violet font-bold flex items-center gap-2"
                  onClick={() => setIsReply(!isReply)}
                >
                  <svg
                    width="14"
                    height="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                  Reply
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="text-carnation font-bold flex items-center gap-2"
                    onClick={() => handleDelete(comment._id)}
                  >
                    <svg
                      width="12"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                        fill="#ED6368"
                      />
                    </svg>
                    Delete
                  </button>
                  <button
                    className="text-blue-violet font-bold flex items-center gap-2"
                    onClick={() => setIsEdit(!isEdit)}
                  >
                    <svg
                      width="14"
                      height="14"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                        fill="#5357B6"
                      />
                    </svg>
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
          <div>
            {isEdit ? (
              <div className="flex flex-col gap-2">
                <Input value={edit} onChange={onChange} />
                <button
                  onClick={() => handleEdit(comment._id)}
                  className="self-end bg-blue-violet text-white rounded px-3 py-2 uppercase font-medium text-xs"
                >
                  {isUpdating ? "Updading..." : "Update"}
                </button>
              </div>
            ) : (
              <p className="text-pale-sky inline break-words">
                {comment.replyingTo && (
                  <span className="text-blue-violet mr-1">
                    @{comment.replyingTo}
                  </span>
                )}
                {comment.content}
              </p>
            )}
          </div>
        </div>
      </div>
      {isReply && (
        <CommentForm
          style={{ marginTop: "0" }}
          user={user}
          replyingTo={isReply ? comment.user?.username : null}
          addComment={addReply}
          parentId={parentId || comment._id}
          isLoading={isLoading}
        />
      )}
      {comment.replies?.length > 0 && (
        <div className="pl-3 md:ml-8 md:pl-8 border-l-2 border-l-athens-gray">
          {comment.replies?.length > 0 && (
            <CommentList
              comments={comment.replies}
              parentId={comment._id}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Comment;
