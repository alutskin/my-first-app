import { Fragment } from "react";
import Header from "../components/Header/Header";
import SignInForm from "../components/SignInForm/SignInForm";

const SignIn = () => {
  return (
    <Fragment>
      <Header text="Sign in" />
      <SignInForm />
    </Fragment>
  );
};

export default SignIn;
