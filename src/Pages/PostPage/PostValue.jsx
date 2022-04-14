import React, { useContext} from "react";
import { CurrentUserContext } from './../../context/CurrentUserContext';
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import {ReactComponent as Save} from "./img/save.svg";
import cn from "classnames"
import { Button } from "@mui/material";




export const PostValue = ({_id, likes, text, image, title, author, handlePostLike, handleDeletePost}) => {
    const currentUser = useContext(CurrentUserContext);
    const isDeleteable = author?._id === currentUser._id
    const isLiked = likes.some(id => id === currentUser._id)
    const navigate = useNavigate();
    function handlePostsLike() {
        handlePostLike({_id, likes})
    }
  
    function handleDeletePostApp() {
        handleDeletePost(author._id, _id)
        navigate(-1)
    }

    return (
    <div className="product">
        <div className="navigation">
            <Link to={"/"} className="card__link">
                <p>На главную</p>
            </Link>
            <pre> / </pre>
            <p>{title}</p>
        </div>
        <div className="info">
            <div className="user_info">
                Автор: <br></br>
                <img className="user_avatar user_info" src={author.avatar} alt="Аватар" />
                {author.name}
                <br></br>
                email: {author.email}
            </div>
            {isDeleteable && <Link to={`/edit/${_id}`} className="card__link">
                <div>
                    <Button  sx={{color: "black"}} className="btn" >Редактировать пост</Button>
                </div>
            </Link>}

        </div>
        <div className="card page_card">
            <img src={image} className="card__image"/>
            <p className="card__desc">{title}</p>
            <div className="description">
                Описание: <br/>
                {text}
            </div>
            <div className="buttons">
                {isDeleteable && <div className="delete_button"><Button sx={{color: "black"}} onClick={handleDeletePostApp} className="btn" >Удалить пост</Button></div>}
                <button className="card__favorite" onClick={handlePostsLike}>
                    <Save className={cn("card__favorite-icon" , {"card__favorite-icon_active": isLiked})}/> 
                </button>
                <button className="page_btn btn" onClick={()=> navigate(-1)}>
                    Назад
                </button>
            </div>
        </div>
    </div>
  );
};
