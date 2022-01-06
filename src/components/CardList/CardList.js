import { useContext } from "react";

import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";
import DataContext from "../../store/data-context";

const CardWithDelay = withLoadingDelay(Card);

const CardList = () => {
  const dataCtx = useContext(DataContext);

  return (
    <div className={classes["card-list"]}>
      {dataCtx.cardsData.map((cardData) => (
        <CardWithDelay
          id={cardData.id}
          key={cardData.id}
          caption={cardData.caption}
          text={cardData.text}
          checked={cardData.checked}
        />
      ))}
    </div>
  );
};

export default CardList;
