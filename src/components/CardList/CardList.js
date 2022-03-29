import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";
import { useSelector, useDispatch } from "react-redux";

const CardWithDelay = withLoadingDelay(Card);

const CardList = () => {
  const cardsData = useSelector((store) => store.cardsData);
  const readOnly = useSelector((store) => store.readOnly);
  const dispatch = useDispatch();

  const updateCheckedStatusHandler = (status, id) => {
    dispatch({ type: "update_checked_status", id, status });
  };

  const updateContentHandler = (newCaption, newText, id) => {
    dispatch({ type: "update_card_content", newCaption, newText, id });
  };

  return (
    <div className={classes["card-list"]}>
      {cardsData.map((cardData) => (
        <CardWithDelay
          id={cardData.id}
          key={cardData.id}
          caption={cardData.caption}
          text={cardData.text}
          checked={cardData.checked}
          readOnly={readOnly}
          onUpdateCheckedStatus={updateCheckedStatusHandler}
          onUpdateContent={updateContentHandler}
        />
      ))}
    </div>
  );
};

export default CardList;
