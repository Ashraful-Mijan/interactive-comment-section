"use client";
import Image from "next/image";
import React, { useState } from "react";
import Input from "./Input";

const CommentForm = ({ user, replyingTo, parentId, addComment, isLoading, ...rest }) => {
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };

  // useLayoutEffect(() => {
  //   textareaRef.current.style.height = "auto";
  //   const { scrollHeight, clientHeight } = textareaRef.current;
  //   textareaRef.current.style.height =
  //     Math.max(scrollHeight, clientHeight) + "px";
  // }, [text]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = {
      content: text,
      user,
    };

    if (replyingTo) {
      formData.replyingTo = replyingTo;
    }

    await addComment({ body: formData, parentId });
    setText('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <div {...rest} className="grid gap-6 grid-cols-[max-content_auto_max-content] lg:grid-cols-[max-content_auto_max-content] p-5 w-full mt-4 rounded-md shadow-sm bg-white">
        <div className="order-2 lg:order-1">
          <Image
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10"
            src={user?.image?.png}
            alt={user?.username}
          />
        </div>
        <div className="order-1 lg:order-2 col-span-full lg:col-auto">
          {/* <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            placeholder="Add comment..."
            contentEditable
            className="textarea block px-4 py-3 rounded-md min-h-24 outline-none border-2 border-athens-gray w-full resize-none"
          ></textarea> */}
          <Input
            value={text}
            onChange={handleChange}
            placeholder="Add comment..."
          />
        </div>
        <div className="order-3 place-self-end lg:place-self-auto col-start-2 lg:col-start-auto col-end-4 lg:col-end-auto">
          <button
            type="submit"
            className="bg-blue-violet text-white font-medium rounded-md py-2 px-5 sm:py-4 sm:px-10 uppercase"
            disabled={isLoading}
          >
            {isLoading ? 'wait...':'Send'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
