import { useState } from "react";
import PropTypes from 'prop-types';

import classes from "./Card.module.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import CardHeader from "../CardHeader/CardHeader";
import CardBody from "../CardBody/CardBody";

function Card(props) {
  const [editable, setEditable] = useState(false);
  const [curCaptionValue, setCurCaptionValue] = useState(props.caption);
  const [curTextValue, setCurTextValue] = useState(props.text);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      props.onUpdateCheckedStatus(true, props.id);
    } else {
      props.onUpdateCheckedStatus(false, props.id);
    }
  };

  const editClickHandler = () => {
    setEditable(true);
    props.onUpdateCheckedStatus(false, props.id);
  };

  const saveChangesHandler = () => {
    props.onUpdateContent(curCaptionValue, curTextValue, props.id);
    setEditable(false);
  };

  const cancelChangesHandler = () => {
    props.onUpdateContent(props.caption + " ", props.text + " ", props.id);
    setCurCaptionValue(props.caption + " ");
    setCurTextValue(props.text + " ");
    setEditable(false);
  };

  const captionChangeHandler = (event) => {
    setCurCaptionValue(event.target.textContent);
  };

  const textChangeHandler = (event) => {
    setCurTextValue(event.target.textContent);
  };

  if (editable && props.readOnly) {
    cancelChangesHandler();
  }

  return (
    <div className={`${classes.card} ${props.checked ? classes["dark-card"] : ""}`}>
      <CardHeader
        caption={props.caption}
        checked={props.checked}
        editable={editable}
        captionChangeHandler={captionChangeHandler}
      />

      <input
        type="checkbox"
        className={classes["select-checkbox"]}
        checked={props.checked}
        style={editable ? { display: "none" } : { display: "inline" }}
        onChange={checkboxHandler}
      />

      <AiFillEdit
        className={classes["edit-icon"]}
        color={props.checked ? "#C0C0C0" : "#3f3f3f"}
        visibility={editable || props.readOnly ? "hidden" : "visible"}
        onClick={editClickHandler}
      />

      <AiFillCheckCircle
        className={classes["save-changes-icon"]}
        color="#3f3f3f"
        visibility={editable ? "visible" : "hidden"}
        onClick={saveChangesHandler}
      />

      <AiFillCloseCircle
        className={classes["cancel-changes-icon"]}
        color="#3f3f3f"
        visibility={editable ? "visible" : "hidden"}
        onClick={cancelChangesHandler}
      />

      <hr color={props.checked ? "#C0C0C0" : "#3f3f3f"} className={classes.line} />

      <CardBody
        text={props.text}
        checked={props.checked}
        editable={editable}
        textChangeHandler={textChangeHandler}
      />
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
  caption: PropTypes.string,
  text: PropTypes.string,
  checked: PropTypes.bool,
  readOnly: PropTypes.bool,
  onUpdateCheckedStatus: PropTypes.func,
  onUpdateContent: PropTypes.func,
};

export default Card;
