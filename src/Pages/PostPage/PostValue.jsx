import React, { useContext} from "react";
import { CurrentUserContext } from './../../context/CurrentUserContext';
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import {ReactComponent as Save} from "./img/save.svg";
import cn from "classnames"



export const PostValue = ({_id, likes, text, image, title, author, handlePostLike}) => {
    const currentUser = useContext(CurrentUserContext);
    const isDeleteable = author._id === currentUser._id
    const isLiked = likes.some(id => id === currentUser._id)
    const navigate = useNavigate();

    function handlePostsLike() {
        handlePostLike({_id, likes})
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
        <div className="card page_card">
            <img src={image} className="card__image"/>
            <p className="card__desc">{title}</p>
            <div className="bottom__buttons">
            {isDeleteable && <div className="deleteButton"><Button onClick={handleDeletePostApp}>Удалить пост</Button></div>}
            {/* <div className="deleteButton"><Button onClick={handleDeletePostApp}>Удалить пост</Button></div> - Это для проверки работы кнопки удаления */} 
            </div>
            <div className="description">
                Описание: <br/>
                {text}
            </div>
            <div className="is_deleteable">
                {isDeleteable && <p className="approved">Вы можете удалить пост</p>}
                {!isDeleteable && <p className="declined">Вы не автор поста и не можете удалить его</p>}
            </div>
            <div className="buttons">
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
