import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import classes from "./SignInForm.module.css";
import Input from "../Input/Input";
import { authActions } from "../../store/authSlice";

const emailValidation = (email) => /\w+@\w+\.\w+/.test(email);

const passwordValidation = (pass) =>
  pass.length >= 8 && /[A-Za-z_]/.test(pass) && /\d/.test(pass);

const SignInForm = () => {
  const [inputsValidity, setInputsValidity] = useState([{ id: "username", isValid: false }, { id: "pass", isValid: false }]);

  const API_KEY = useSelector(store => store.auth.apiKey);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const emailRef = useRef();
  const passRef = useRef();

  const changeInputVilidity = (id, validity) => {
    let newState = inputsValidity.slice();
    let requestedInput = newState.find((inputData) => inputData.id === id);
    requestedInput.isValid = validity;
    setInputsValidity(newState);
  };

  const formIsValid = inputsValidity.reduce(
    (prev, cur) => prev.isValid && cur.isValid
  );

  const signInHandler = async (event) => {
    event.preventDefault();

    const signUp = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    const signIn = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    const process = emailRef.current.value === "testAdmin@gmail.com" ? signIn : signUp;

    const res = await axios.post(process, {
      email: emailRef.current.value,
      password: passRef.current.value,
      returnSecureToken: true,
    });

    const token = res.data.idToken;

    dispatch(authActions.signIn({ token, userName: emailRef.current.value }));

    navigate("/home");
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <Input
          id="username"
          ref={emailRef}
          key="username"
          type="email"
          label="Username"
          placeholder="abc@fg.hi"
          errorText='Username must be an email with the next format: "abc@fg.hi"'
          required={true}
          validation={emailValidation}
          onChangeInputValidity={changeInputVilidity}
        />
        <Input
          id="pass"
          ref={passRef}
          key="pass"
          type="password"
          label="Password"
          placeholder=""
          errorText="Password must have at least 7 symbols length, 1 letter and 1 number"
          required={true}
          validation={passwordValidation}
          onChangeInputValidity={changeInputVilidity}
        />
        <div className={classes.butField}>
          <button
            onClick={signInHandler}
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
