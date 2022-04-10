import React from "react";
import { useLocation } from "react-router-dom";

import s from "./index.module.css";

export function Form({
  children,
  onSubmit,
  title,
  infoTextTop,
  infoTextBottom,
  ...props
}) {
  return (
    <div>
      <form onSubmit={onSubmit} className={s.form}>
        <h1 className={s.title}>{title}</h1>

        {infoTextTop&&<p className={s.infoText}>{infoTextTop}</p>}
        {children}
        {infoTextBottom &&<p className={s.infoText}>{infoTextBottom}</p>}


      </form>
    </div>
  );
}
