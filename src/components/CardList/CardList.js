import { useSelector } from "react-redux";

import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";

const CardWithDelay = withLoadingDelay(Card);

const CardList = () => {
  const cardsData = useSelector((store) => store.root.cardsData);

  return (
    <div className={classes["card-list"]}>
      {cardsData.map((cardData) => (
        <CardWithDelay
          id={cardData.id}
          key={cardData.id}
        />
      ))}
    </div>
  );
};

export default CardList;
