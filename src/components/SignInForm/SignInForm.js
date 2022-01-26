import classes from "./SignInForm.module.css";

const SignInForm = () => {
  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <div className={classes.field}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" />
        </div>
        <div className={classes.field}>
          <label htmlFor="pass">Password</label>
          <input type="password" id="pass" />
        </div>
        <div className={classes.butField}>
          <button type="submit" className={classes.submButton}>
            Войти
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
