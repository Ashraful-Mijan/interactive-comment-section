import React from "react";
import Comment from "./comment";

const CommentList = ({ comments, parentId, user }) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} parentId={parentId} user={user} />
      ))}
    </div>
  );
};

export default CommentList;
