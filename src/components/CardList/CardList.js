import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { rootActions } from "../../store/rootSlice";

const CardWithDelay = withLoadingDelay(Card);

const CardList = () => {
  const cardsData = useSelector((store) => store.root.cardsData);
  const readOnly = useSelector((store) => store.root.readOnly);
  const dispatch = useDispatch();

  const updateCheckedStatusHandler = (status, id) => {
    dispatch(rootActions.updateCheckedStatus({ id, status }));
  };

  const updateContentHandler = (newCaption, newText, id) => {
    dispatch(rootActions.updateCardContent({ id, newCaption, newText }));
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
