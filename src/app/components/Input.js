"use client";
import React, { useLayoutEffect, useRef } from "react";

const Input = (props) => {
  const textareaRef = useRef(null);
  const { value } = props;

  useLayoutEffect(() => {
    textareaRef.current.style.height = "auto";
    const { scrollHeight, clientHeight } = textareaRef.current;
    textareaRef.current.style.height =
      Math.max(scrollHeight, clientHeight) + "px";
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      {...props}
      className="textarea block px-4 py-3 rounded-md min-h-24 outline-none border-2 border-athens-gray w-full resize-none"
    ></textarea>
  );
};

export default Input;
