import { useState, useEffect } from "react";

import classes from "./Input.module.css";

const Input = (props) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = props.validation(value);
  const inputHasError = !valueIsValid && isTouched;

  const { id, onChangeValidInputsIds } = props;

  useEffect(() => {
    if (valueIsValid) {
      onChangeValidInputsIds({ typeOfChange: "add", inputId: id });
    } else {
      onChangeValidInputsIds({
        typeOfChange: "remove",
        inputId: id,
      });
    }
  }, [valueIsValid, id, onChangeValidInputsIds]);

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
};

export default Input;
