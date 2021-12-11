import classes from "./CardBody.module.css";

const CardBody = (props) => {
  return (
    <p
      className={`${classes.text} ${props.checked ? classes["dark-text"] : ""}`}
      contentEditable={props.editable}
      onKeyUp={props.textChangeHandler}
    >
      {props.text}
    </p>
  );
};

export default CardBody;
