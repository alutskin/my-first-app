import React, { useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import classes from "./AddCardButton.module.css";
import DataContext from "../../store/data-context";

const AddCardButton = () => {
  const dataCtx = useContext(DataContext);

  return (
    <button
      className={classes["add-card-button"]}
      onClick={dataCtx.onStartAddNewCard}
    >
      <AiFillPlusCircle className={classes["add-card-icon"]} />
      Добавить карточку
    </button>
  );
};

export default AddCardButton;
