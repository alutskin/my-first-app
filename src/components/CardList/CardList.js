import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { rootActions } from "../../store/rootSlice";
import { useCallback } from "react";

const CardWithDelay = withLoadingDelay(Card);

const CardList = () => {
  const cardsData = useSelector((store) => store.root.cardsData);
  const readOnly = useSelector((store) => store.root.readOnly);
  const dispatch = useDispatch();

  const updateCheckedStatusHandler = useCallback((status, id) => {
    dispatch(rootActions.updateCheckedStatus({ id, status }));
  }, [dispatch]);

  const updateContentHandler = useCallback((newCaption, newText, id) => {
    dispatch(rootActions.updateCardContent({ id, newCaption, newText }));
  }, [dispatch]);

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
