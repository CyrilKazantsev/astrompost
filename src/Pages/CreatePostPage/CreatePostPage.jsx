import React from "react";
import { useForm } from "react-hook-form";
import { emailRegexp, passwordRegexp } from "../../utilits/utils";
import { Form } from "../../components/Form";
import { FormInput } from "../../components/FormInput";
import { FormButton } from "../../components/FormButton";
import api from "../../utilits/Api";

export function CreatePostPage({children}) {
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

//   const tagsRegister = register("tag");
const handleCreatePost = ({title, text, image = "", tags = ""}) => {
    api.createPost(title, text, image, tags)
        .then(response => {
            console.log(response);
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

      <FormInput
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
        id="title"
        type="text"
        placeholder="Ссылка на картинку"
      />

      <div>
        {errors?.image && (
          <p className="errorMessage">{errors?.image?.message}</p>
        )}
      </div>

        {/* <FormInput
        {...tagsRegister}
        id="title"
        type="text"
        placeholder="Теги"
      /> */}

      {children}
      
      <FormButton type="submit" color="yellow">
        Создать пост
      </FormButton>
    </Form>
  );
}