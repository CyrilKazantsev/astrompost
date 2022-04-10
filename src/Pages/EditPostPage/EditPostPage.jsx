import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import api from "../../utilits/Api";
import FormTextarea from "../../components/FormTextarea";
import { Button } from "@mui/material";

export function EditPostPage({children, cards}) {

  const navigate = useNavigate()
  const [newCard, setNewCard] = useState()
  const { postID } = useParams();
  useEffect(() => cards.map((card) => {
    if (card._id === postID && card._id !== newCard?._id) return setNewCard(card);
  }))

  const {
    register,
    handleSubmit,
    setValue
  } = useForm({
    mode: "onBlur",
  });

  const titleRegister = register("title");

  const textRegister = register("text");

  const imageRegister = register("image");

  const tagsRegister = register("tag");

const handleEditPost = ({title, text, image, tags = ""}) => {
    api.editPost(postID, title, text, image, tags)
        .then(() => navigate(-1))
        .then(() => {
         setCards()
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
        placeholder="Заголовок"
      />

      <FormTextarea
              {...textRegister}
              id="text"
              type="text"
              placeholder="Описание"
      />

      <FormInput
        {...imageRegister}
        id="title"
        type="text"
        placeholder="Ссылка на картинку"
      />

      <FormInput
        {...tagsRegister}
        id="tags"
        type="text"
        placeholder="Теги"
      />

      {children}
      
      <FormButton type="submit" color="yellow">
        Редактировать пост
      </FormButton>
      <Button className="btn" sx={{color: "black", width: "100%", borderRadius: "55px"}} onClick={() => {
        setValue("title", newCard?.title), 
        setValue("text", newCard?.text), 
        setValue("image", newCard?.image)}}>
        Восстановить изначальные данные
      </Button>
    </Form>
  );
}