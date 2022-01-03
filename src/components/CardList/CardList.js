import withLoadingDelay from "../../UI/withLoadingDelay/withLoadingDelay";
import Card from "../Card/Card";
import classes from "./CardList.module.css";

const CardWithDelay = withLoadingDelay(Card);

const CardList = (props) => {
  return (
    <div className={classes["card-list"]}>
      {props.data.map((cardData) => (
        <CardWithDelay
          id={cardData.id}
          key={cardData.id}
          caption={cardData.caption}
          text={cardData.text}
          checked={cardData.checked}
          readOnly={props.readOnly}
          onUpdateContent={props.onUpdateContent}
          onUpdateCheckedStatus={props.onUpdateCheckedStatus}
        />
      ))}
    </div>
  );
};

export default CardList;
