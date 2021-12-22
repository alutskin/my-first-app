import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import classes from "./AddCardButton.module.css";

const AddCardButton = ({ onClick }) => {
  return (
    <button className={classes["add-card-button"]} onClick={onClick}>
      <AiFillPlusCircle className={classes["add-card-icon"]} />
      Добавить карточку
    </button>
  );
};

export default AddCardButton;
