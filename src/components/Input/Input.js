import React, { useState, useEffect } from "react";

import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = props.validation(value);
  const inputHasError = !valueIsValid && isTouched;

  const { id } = props;

  useEffect(() => {
    props.onChangeInputValidity(id, valueIsValid); // eslint-disable-next-line
  }, [id, valueIsValid]);

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  return (
    <div className={`${classes.field} ${inputHasError ? classes.invalid : ""}`}>
      <label htmlFor={id}>{props.label}</label>
      <input
        id={id}
        ref={ref}
        type={props.type}
        required={props.required}
        value={value}
        placeholder={props.placeholder}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler}
      />
      {inputHasError && (
        <p className={classes["error-text"]}>{props.errorText}</p>
      )}
    </div>
  );
});

export default Input;
