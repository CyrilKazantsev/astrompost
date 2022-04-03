import React from "react";
import s from "./styles.module.css";
import { Post } from "../Post";

export const PostsList = ({postsData, handlePostLike, handleDeletePost}) => {
  return (
      <>
        <div className={s.posts}>
          {postsData?.map( ({__v, ...dataItem}) => {
            return (<Post key={`${dataItem._id}`} {...dataItem} handlePostLike={handlePostLike} handleDeletePost={handleDeletePost}/>)
          })}
        </div>
      </>
  );
};