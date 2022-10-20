import ContentEditable from "react-contenteditable";
import classes from "./CardHeader.module.css";

const CardHeader = (props) => {
  return (
    <ContentEditable
      className={`${classes.caption} ${props.checked ? classes["dark-caption"] : ""}`}
      disabled={!props.editable}
      onChange={props.captionChangeHandler}
      html={props.caption}
      tagName="h2"
    />
  );
};

export default CardHeader;
