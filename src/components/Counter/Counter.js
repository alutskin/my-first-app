import classes from "./Counter.module.css";
import { useSelector } from "react-redux";

const Counter = () => {
  const cardsData = useSelector((store) => store.cardsData);

  return (
    <div className={classes.counter}>
      Карточки <span className={classes.number}>{cardsData.length}</span>
    </div>
  );
};

export default Counter;
