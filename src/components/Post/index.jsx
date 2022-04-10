import React, { useContext } from "react";
import "./style.css";
import { Button } from '@mui/material';
import {ReactComponent as Save} from "./img/save.svg";
import cn from "classnames";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { Link } from "react-router-dom";

export const Post = ({title, image, likes, handlePostLike, _id, author, handleDeletePost}) => {
  const handleOpenDescription = () => {
    return
  }
  const currentUser = useContext(CurrentUserContext);
  const isLiked = likes.some(id => id === currentUser._id)
  const isDeleteable = author?._id === currentUser._id

  function handlePostsLike() {
    handlePostLike({_id, likes})
  }

  function handleDeletePostApp() {
    handleDeletePost(author._id, _id)
  }


  
  return (
    <div className="card">
        <img src={image} className="card__image"/>
        <p className="card__desc">{title}</p>
        <div className="bottom__buttons">
          {isDeleteable && <div className="deleteButton"><Button onClick={handleDeletePostApp}>Удалить пост</Button></div>}
          {/* <div className="deleteButton"><Button onClick={handleDeletePostApp}>Удалить пост</Button></div> - Это для проверки работы кнопки удаления */} 
          <div>
            <Link to={`/post/${_id}`} className="card__link">
              <button onClick={handleOpenDescription} className="btn">
                Подробнее
              </button>
            </Link>
          </div>
          <div className="card__sticky card__sticky_type_bottom-right">
            <p>{likes.length}</p>
            <button className="card__favorite" onClick={handlePostsLike}>
              <Save className={cn("card__favorite-icon" , {"card__favorite-icon_active": isLiked})}/> 
            </button>
          </div>
        </div>
    </div>
  );
};