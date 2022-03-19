import React from "react";
import "./style.css";
// import cn from "classnames";
// import { Button } from "../Button";
import { Button } from '@mui/material';

export const Post = ({title, image, text}) => {
  const handleOpenDescription = () => {
    alert(text)
  }
  return (
    <div className="card">
        <img src={image} className="card__image"/>
        <p className="card__desc">{title}</p>
        <Button
          onClick={handleOpenDescription}
        >
          Подробнее
        </Button>
    </div>
  );
};