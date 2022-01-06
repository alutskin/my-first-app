import React, { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";

import classes from "./DeleteButton.module.css";
import DataContext from "../../store/data-context";

const DeleteButton = () => {
  const dataCtx = useContext(DataContext);

  return (
    <button
      className={classes["delete-button"]}
      onClick={dataCtx.onDeleteSelectedCards}
    >
      <AiFillDelete className={classes["delete-icon"]} />
      Удалить выбранные карточки
    </button>
  );
};

export default DeleteButton;
