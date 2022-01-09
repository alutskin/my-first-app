import { useContext } from "react";

import classes from "./Counter.module.css";
import DataContext from "../../store/data-context";

const Counter = () => {
  const dataCtx = useContext(DataContext);

  return (
    <div className={classes.counter}>
      Карточки{" "}
      <span className={classes.number}>{dataCtx.cardsData.length}</span>
    </div>
  );
};

export default Counter;
