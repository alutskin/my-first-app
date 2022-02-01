import { useState } from "react";

import classes from "./SignInForm.module.css";
import Input from "../Input/Input";

const emailValidation = (email) => /\w+@\w+\.\w+/.test(email);

const passwordValidation = (pass) =>
  pass.length >= 8 && /\w/.test(pass) && /\d/.test(pass);

const INPUTS_COUNT = 2;

const SignInForm = () => {
  const [validInputsIds, setValidInputsIds] = useState([]);

  const changeValidInputsIds = ({ typeOfChange, inputId }) => {
    const idIsAlreadyContained = validInputsIds.includes(inputId);

    if (typeOfChange === "add" && !idIsAlreadyContained) {
      let newState = validInputsIds.slice();
      newState.push(inputId);
      setValidInputsIds(newState);
    } else if (typeOfChange === "remove" && idIsAlreadyContained) {
      let newState = validInputsIds.filter((someId) => someId !== inputId);
      setValidInputsIds(newState);
    }
  };

  const formIsValid = validInputsIds.length === INPUTS_COUNT;

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <Input
          id="username"
          type="email"
          label="Username"
          placeholder="abc@fg.hi"
          errorText='Username must be an email with the next format: "abc@fg.hi"'
          required={true}
          validation={emailValidation}
          onChangeValidInputsIds={changeValidInputsIds}
        />
        <Input
          id="pass"
          type="password"
          label="Password"
          errorText="Password must have at least 7 symbols length, 1 letter and 1 number"
          required={true}
          validation={passwordValidation}
          onChangeValidInputsIds={changeValidInputsIds}
        />
        <div className={classes.butField}>
          <button
            className={classes.submButton}
            type="submit"
            disabled={!formIsValid}
          >
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
