"use client";
import CommentList from "./components/CommentList";
import CommentForm from "./components/CommentForm";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "./redux/features/comment/commentApi";
import { useGetCurrentUserQuery } from "./redux/features/user/userApi";
export default function Home() {
  // useEffect(() => {
  //   fetch("api/comments")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //     });
  //   fetch("api/currentUser")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data?.currentUsers[0]);
  //     });
  // }, []);

  const { data: comments } = useGetCommentsQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const [addComment] = useAddCommentMutation();
  return (
    <main className="flex min-h-screen flex-col justify-center items-center px-3 md:px-20 lg:px-52 xl:px-72 py-[50px]">
      <div className="">
        {/* <h1>interactive comments section</h1> */}
        {currentUser && (
          <CommentList comments={comments ?? []} user={currentUser[0]} />
        )}
        {currentUser && (
          <CommentForm user={currentUser[0]} addComment={addComment} />
        )}
      </div>
    </main>
  );
}
