import React, { useState, useEffect } from "react";
import { Footer } from "./components/Footer";
import { PostsList } from "./components/PostsList";
import { Header } from "./components/Header";
import api from "./utilits/Api";
import { CurrentUserContext } from "./context/CurrentUserContext";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NotFoundPage } from "./Pages/NotFoundPage/NotFoundPage";
import { PostPage } from "./Pages/PostPage/PostPage";
import { FavoritesPage } from "./Pages/FavoritesPage/FavoritesPage";
import { MyPostsPage } from "./Pages/MyPostsPage/MyPostsPage";
import { CreatePostPage } from "./Pages/CreatePostPage/CreatePostPage";
import { EditPostPage } from "./Pages/EditPostPage/EditPostPage";


export const App = () => {
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [myPosts, setMyPosts] = useState([])
  // const [CardsTotal, setCardsTotal] = useState(0)


  const navigate = useNavigate();

  // Обновление карточек, избранного и постов пользователя
  useEffect(() => {
    Promise.all([api.getPostsList(), api.getUserInfo()]).then(
      ([postData, userData]) => {
        setCards(postData);
        console.log(postData);
        // setCardsTotal(postData.total);
        setCurrentUser(userData);

        const favoriteData = postData.filter((item) =>
        item.likes.some(id => id === userData._id)
        )
        setFavorites(favoriteData);

        const myData = postData.filter((item) => {
          return item.author?._id === userData._id
        })
        setMyPosts(myData);
      }
    );
  }, []);
  // Информация о пользователе
  function handleUpdateUser(userUpdate) {
    api.setUserInfo(userUpdate).then((newUserData) => {
      setCurrentUser(newUserData);
    });
  }

  // Обновление лайков и пополнение списка избранных постов
  function handlePostLike({ _id, likes }) {
    const isLiked = likes.some((id) => id === currentUser._id);
    api.setLikeStatus(_id, isLiked).then((newCard) => {
      const newCardsState = cards.map((c) => {
        return c._id === newCard._id ? newCard : c;
      });

      if(!isLiked){
        setFavorites(prevState => [...prevState, newCard ])
      } else {
        setFavorites(prevState => {
          return prevState.filter(card => card._id !== newCard._id)
        })
      }

      setCards(newCardsState);
    });
  }

  // Удаление своего поста
  function handleDeletePost(authorId, postId) {
    if (authorId === currentUser._id) {
      api.deletePostById(postId)
       .then(() => navigate("/"))
       .then(() => {
        setCards(prevState => {return prevState.filter(post => post._id !== postId)});
       })
       
      } else {
      alert(`Твой ID - ${currentUser._id}, а автора - ${authorId}. Ты не можешь удалить его пост =(`)
    }
  }


  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onUpdateUser={handleUpdateUser} />
        <main className="content container">
          <Routes>
            <Route
              path="/"
              element={
                <div className="content__cards">
                  <PostsList postsData={cards} handlePostLike={handlePostLike} handleDeletePost={handleDeletePost}/>
                </div>
              }
            />
            <Route
                path="/myposts"
                element={
                  <MyPostsPage
                    myPosts={myPosts} 
                    handlePostLike={handlePostLike} 
                    handleDeletePost={handleDeletePost}
                  />
                }
              />
            <Route
                path="/favorites"
                element={
                  <FavoritesPage
                    favoritesPosts={favorites} 
                    handlePostLike={handlePostLike} 
                    handleDeletePost={handleDeletePost}
                  />
                }
              />
            <Route
              path="/createpost"
              element={
                <CreatePostPage 
                  cards={cards}
                  setCards={setCards} 
                />
              }
            />
            <Route
              path="/edit/:postID"
              element={
                <EditPostPage 
                  cards={cards}
                />
              }
            />
            <Route
              path="/post/:postID"
              element={
                <PostPage
                  cards={cards}
                  handlePostLike={handlePostLike}
                  handleDeletePost={handleDeletePost}
                />
              }
            />
            <Route path="*" element={<NotFoundPage  title="Страница не найдена" buttonText="На главную" buttonAction={()=> navigate("/")}/>} />
          </Routes>
        </main>
        <Footer/>
      </CurrentUserContext.Provider>
    </>
  );
  };
