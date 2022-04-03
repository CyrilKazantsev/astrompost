import React from "react";
import { useNavigate } from "react-router-dom";
import { PostsList } from "../../components/PostsList";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";

export const FavoritesPage = ({favoritesPosts, handlePostLike, handleDeletePost}) => {
    const navigate = useNavigate();
  return (
      <>
        {favoritesPosts.length !== 0 && <PostsList postsData={favoritesPosts} handlePostLike={handlePostLike} handleDeletePost={handleDeletePost}/>}
        {favoritesPosts.length === 0 && <NotFoundPage  title="Вы не добавили ничего в избранное!" buttonText="На главную" buttonAction={()=> navigate("/")}/>}
      </>
  );
};