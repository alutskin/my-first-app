import { useState } from "react";

import "./Card.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

function Card(props) {
  let classNames = require("classnames");

  const [checked, setChecked] = useState(props.checked);
  const [editable, setEditable] = useState(false);
  const [caption, setCaption] = useState(props.caption);
  const [curCaptionValue, setCurCaptionValue] = useState(caption);
  const [text, setText] = useState(props.text);
  const [curTextValue, setCurTextValue] = useState(text);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const editClickHandler = () => {
    setEditable(true);
    setChecked(false);
  };

  const saveChangesHandler = () => {
    setCaption(curCaptionValue);
    setText(curTextValue);
    setEditable(false);
  };

  const cancelChangesHandler = () => {
    // I don't know, why, but it doesn't work without "+ ' '".
    // If you explain this case to me, I will be grateful.
    setCaption(caption + ' ');
    setText(text + ' ');
    setEditable(false);
  };

  const captionChangeHandler = (event) => {
    setCurCaptionValue(event.target.textContent);
  };

  const textChangeHandler = (event) => {
    setCurTextValue(event.target.textContent);
  };

  return (
    <div className={classNames("card", { darkCard: checked })}>
      <h2
        className={classNames("caption", { darkCaption: checked })}
        contentEditable={editable}
        onKeyUp={captionChangeHandler}
      >
        {caption}
      </h2>

      <input
        type="checkbox"
        id="one"
        checked={checked}
        style={editable ? {display: "none"} : {display: "inline"}}
        onChange={checkboxHandler}
      />

      <AiFillEdit
        id="two"
        color={checked ? "#C0C0C0" : "#3f3f3f"}
        visibility={editable ? "hidden" : "visible"}
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

      <hr color={checked ? "#C0C0C0" : "#3f3f3f"} className="line" />
      
      <p
        className={classNames("text", { darkText: checked })}
        contentEditable={editable}
        onKeyUp={textChangeHandler}
      >
        {text}
      </p>
    </div>
  );
}

export default Card;
