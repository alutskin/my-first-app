import React from "react";
import { AiFillDelete } from "react-icons/ai";

import classes from "./DeleteButton.module.css";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className={classes["delete-button"]}
      onClick={onClick}
    >
      <AiFillDelete className={classes["delete-icon"]} />
      Удалить выбранные карточки
    </button>
  );
};

export default DeleteButton;
