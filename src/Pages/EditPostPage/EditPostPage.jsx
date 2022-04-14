import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import api from "../../utilits/Api";
import FormTextarea from "../../components/FormTextarea";

export function EditPostPage({children, cards, setCards, setMyPosts, myPosts}) {

  const navigate = useNavigate()
  const [newCard, setNewCard] = useState()
  const { postID } = useParams();
  cards.map((card) => {
    if (card._id === postID && card._id !== newCard?._id) return setNewCard(card);
  })

  const {
    register,
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const titleRegister = register("title");

  const textRegister = register("text");

  const imageRegister = register("image");

  const tagsRegister = register("tags");

// Функция редактирования поста
const handleEditPost = (data) => {
  data = {...data, tags: data.tags.split(",").map(tag => tag.trim())}
    api.editPost(data, postID)
    .then(newCard => {
      const newCards = cards.map(card => card._id === postID ? newCard : card)
      const myNewPosts = myPosts.map(card => card._id === postID ? newCard : card)
      setCards(newCards)
      setMyPosts(myNewPosts)
      navigate(-1)
    })
    .catch( error => {
      console.log(error);
    })
}

  return (
    <Form title="Редактирование поста" onSubmit={handleSubmit(handleEditPost)}>
      <FormInput
        {...titleRegister}
        id="title"
        type="text"
        defaultValue={newCard?.title}
        placeholder="Заголовок"
      />
      <FormTextarea
              {...textRegister}
              id="text"
              type="text"
              defaultValue={newCard?.text}
              placeholder="Описание"
      />
      <FormInput
        {...imageRegister}
        id="image"
        type="url"
        defaultValue={newCard?.image}
        placeholder="Ссылка на картинку"
      />
      <FormInput
        {...tagsRegister}
        id="tags"
        type="text"
        defaultValue={newCard?.tags}
        placeholder="Теги"
      />
      {children}
      <FormButton type="submit" color="yellow">
        Редактировать пост
      </FormButton>
    </Form>
  );
}