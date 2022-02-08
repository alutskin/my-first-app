import { useState } from "react";

import classes from "./SignInForm.module.css";
import Input from "../Input/Input";

const emailValidation = (email) => /\w+@\w+\.\w+/.test(email);

const passwordValidation = (pass) =>
  pass.length >= 8 && /[A-Za-z_]/.test(pass) && /\d/.test(pass);

const INPUTS = [
  {
    id: "username",
    type: "email",
    label: "Username",
    placeholder: "abc@fg.hi",
    errorText: 'Username must be an email with the next format: "abc@fg.hi"',
    required: true,
    isValid: false,
    validation: emailValidation,
  },
  {
    id: "pass",
    type: "password",
    label: "Password",
    placeholder: "",
    errorText:
      "Password must have at least 7 symbols length, 1 letter and 1 number",
    required: true,
    isValid: false,
    validation: passwordValidation,
  },
];

const SignInForm = () => {
  const [inputsValidity, setInputsValidity] = useState(
    INPUTS.map(({ id, isValid }) => {
      return { id, isValid };
    })
  );

  const changeInputVilidity = (id, validity) => {
    let newState = inputsValidity.slice();
    let requestedInput = newState.find((inputData) => inputData.id === id);
    requestedInput.isValid = validity;
    setInputsValidity(newState);
  };

  const formIsValid = inputsValidity.reduce(
    (prev, cur) => prev.isValid && cur.isValid
  );

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        {INPUTS.map((input) => (
          <Input
            id={input.id}
            key={input.id}
            type={input.type}
            label={input.label}
            placeholder={input.placeholder}
            errorText={input.errorText}
            required={input.required}
            validation={input.validation}
            onChangeInputValidity={changeInputVilidity}
          />
        ))}
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
