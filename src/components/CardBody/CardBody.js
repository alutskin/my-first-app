import ContentEditable from "react-contenteditable";
import classes from "./CardBody.module.css";

const CardBody = (props) => {
  return (
    <ContentEditable
      className={`${classes.text} ${props.checked ? classes["dark-text"] : ""}`}
      disabled={!props.editable}
      onChange={props.textChangeHandler}
      html={props.text}
      tagName="p"
    />
  );
};

export default CardBody;
