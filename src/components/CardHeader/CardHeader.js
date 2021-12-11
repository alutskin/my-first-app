import classes from "./CardHeader.module.css";

const CardHeader = (props) => {
  return (
    <h2
      className={`${classes.caption} ${props.checked ? classes["dark-caption"] : ""}`}
      contentEditable={props.editable}
      onKeyUp={props.captionChangeHandler}
    >
      {props.caption}
    </h2>
  );
};

export default CardHeader;
