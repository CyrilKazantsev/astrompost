import React from "react";
import s from"./styles.module.css";
import NotFoundImage from "./img/cat.svg"


export const NotFoundPage = ({title, buttonText, buttonAction}) => {
  return (
        <div className={s.notFound}>
            <img src={NotFoundImage} className={s.image} alt="Кот" aria-hidden="true"/>
            <h2 className={s.title}>{title}</h2>
            <button className="btn" onClick={buttonAction}>{buttonText}</button>
        </div>
  );
};
