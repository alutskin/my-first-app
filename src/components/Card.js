import { useState } from "react";

import "./Card.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

function Card(props) {
  let classNames = require("classnames");

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
    props.onUpdateContent(props.caption + ' ', props.text + ' ', props.id);
    setCurCaptionValue(props.caption + ' ');
    setCurTextValue(props.text + ' ');
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
    <div className={classNames("card", { darkCard: props.checked })}>
      <h2
        className={classNames("caption", { darkCaption: props.checked })}
        contentEditable={editable}
        onKeyUp={captionChangeHandler}
      >
        {props.caption}
      </h2>

      <input
        type="checkbox"
        id="one"
        checked={props.checked}
        style={editable ? {display: "none"} : {display: "inline"}}
        onChange={checkboxHandler}
      />

      <AiFillEdit
        id="two"
        color={props.checked ? "#C0C0C0" : "#3f3f3f"}
        visibility={editable || props.readOnly ? "hidden" : "visible"}
        onClick={editClickHandler}
      />

      <AiFillCheckCircle
        id="three"
        color="#3f3f3f"
        visibility={editable ? "visible" : "hidden"}
        onClick={saveChangesHandler}
      />

      <AiFillCloseCircle
        id="four"
        color="#3f3f3f"
        visibility={editable ? "visible" : "hidden"}
        onClick={cancelChangesHandler}
      />

      <hr color={props.checked ? "#C0C0C0" : "#3f3f3f"} className="line" />
      
      <p
        className={classNames("text", { darkText: props.checked })}
        contentEditable={editable}
        onKeyUp={textChangeHandler}
      >
        {props.text}
      </p>
    </div>
  );
}

export default Card;
