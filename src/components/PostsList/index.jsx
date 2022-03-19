import React from "react";
import s from "./styles.module.css";
import { Post } from "../Post";

export const PostsList = ({postsData}) => {
  return (
      <>
        <div className={s.posts}>
          {postsData.map( ({__v, ...dataItem}) => { // Так можно избавиться от ненужного поля
            return (<Post key={`${dataItem._id}`} {...dataItem}/>)
          })}
        </div>
      </>
  );
};