import React, { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
import { PostsList } from "./components/PostsList";
import { Header } from "./components/Header";
import api from "./utilits/Api";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { Pagination, Stack } from "@mui/material";


export const App = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  // const [rows, setRows] = useState(10);
  // Потом будет UseEffect который вызывает setCards


  // Обновление карточек
  useEffect(() => {
    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      ([postData, userData]) => {
        setCards(postData);
        setCurrentUser(userData);
      }
    );
  }, []);
  // Информация о пользователе
  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  // Обновление лайков
  function handlePostLike({ _id, likes }) {
    const isLiked = likes.some((id) => id === currentUser._id);
    api.setLikeStatus(_id, isLiked).then((newCard) => {
      const newCardsState = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });

      setCards(newCardsState);
    });
  }

  // Удаление своего поста
  function handleDeletePost(authorId, postId) {
    if (authorId === currentUser._id) {
      api.deletePostById(postId)
    } else {
      alert(`Твой ID - ${currentUser._id}, а автора - ${authorId}. Ты не можешь удалить его пост =(`)
    }
  }


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onUpdateUser={handleUpdateUser} />
        <main className="content container">
          <div className="content__cards">
            <PostsList postsData={cards} handlePostLike={handlePostLike} handleDeletePost={handleDeletePost}/>
          </div>
        </main>
        <Footer/>
      </CurrentUserContext.Provider>
      
    </>
  );
  };