import React, { useCallback } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { useApi } from "../../hooks/useApi/useApi";
import api from "../../utilits/Api";
import { PostValue } from "./PostValue";

export const PostPage = ({cards, handlePostLike}) => {
  const navigate = useNavigate()
  const { postID } = useParams();
  
  const handler = useCallback(()=> {
    return api.getPostById(postID)
  }, [postID, cards]);

  const {data: post, error} = useApi(handler);


  return (
    <>
          {error && <NotFoundPage title="Пост не найден" buttonText="Назад" buttonAction={()=> navigate(-1)} />}
          {post && <PostValue {...post} handlePostLike={handlePostLike}/>}
    </>
  );
};