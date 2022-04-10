import React from "react";
import { useNavigate } from "react-router-dom";
import { PostsList } from "../../components/PostsList";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export const MyPostsPage = ({myPosts, handlePostLike, handleDeletePost}) => {
  const navigate = useNavigate();
  return (
      <>
        {myPosts.length !== 0 && <PostsList postsData={myPosts} handlePostLike={handlePostLike} handleDeletePost={handleDeletePost}/>}
        {myPosts.length === 0 && <NotFoundPage  title="Вы не создавали ещё постов!" buttonText="На главную" buttonAction={()=> navigate("/")}/>}
      </>
  );
};