import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import api from "../../utilits/Api";
import FormTextarea from "../../components/FormTextarea";
import { useNavigate } from "react-router-dom";

export function CreatePostPage({children, setCards, setMyPosts}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });

  const titleRegister = register("title", {
    required: "Обязательное поле",
  });

  const textRegister = register("text", {
    required: "Обязательное поле"
  });

  const imageRegister = register("image", {
    required: "Обязательное поле"
  });

  const tagsRegister = register("tags");

  // Функция создания поста
  const handleCreatePost = (data) => {
    data = {...data, tags: data.tags.split(",").map(tag => tag.trim())}
    api.createPost(data)
        .then(newCard => {
          setCards(prevState => [...prevState, newCard])
          setMyPosts(prevState => [...prevState, newCard]);
          navigate(`/post/${newCard._id}`)
        })
        .catch( error => {
            console.log(error);
        })
}


  return (
    <Form title="Ваш пост" onSubmit={handleSubmit(handleCreatePost)}>
      <FormInput
        {...titleRegister}
        id="title"
        type="text"
        placeholder="Заголовок"
      />
      <div>
        {errors?.title && (
          <p className="errorMessage">{errors?.title?.message}</p>
        )}
      </div>
      <FormTextarea
              {...textRegister}
              id="text"
              type="text"
              placeholder="Описание"
      />
      <div>
        {errors?.text && (
          <p className="errorMessage">{errors?.text?.message}</p>
        )}
      </div>
      <FormInput
        {...imageRegister}
        id="image"
        type="url"
        placeholder="Ссылка на картинку"
      />
      <div>
        {errors?.image && (
          <p className="errorMessage">{errors?.image?.message}</p>
        )}
      </div>
        <FormInput
        {...tagsRegister}
        id="tags"
        type="text"
        placeholder="Теги"
      />
      {children}
      <FormButton type="submit" color="yellow">
        Создать пост
      </FormButton>
    </Form>
  );
}