import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button className={classes.button} onClick={props.onClick}>
      {React.Children.map(props.children, (child) => {
          return React.cloneElement(child, { className: classes.icon });
      })}
      {props.text}
    </button>
  );
};

export default Button;
