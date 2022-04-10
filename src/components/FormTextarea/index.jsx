import React, { forwardRef } from 'react';
import s from './index.module.css'

const FormTextarea = forwardRef((props, ref) => {
  return (
    <textarea ref={ref} className={s.textarea} {...props} autoComplete="new-password"></textarea>
  );
});

export default FormTextarea;
