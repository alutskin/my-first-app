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
  const [text, setText] = useState(props.text);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const editClickHandler = () => {
    setEditable(true);
  };

  const saveChangesHandler = () => {
    setCaption(document.querySelector(".caption").innerHTML);
    setText(document.querySelector(".text").innerHTML);
    setEditable(false);
  };

  const cancelChangesHandler = () => {
    setEditable(false);
    setCaption(caption);
    setText(text);
  };

  return (
    <div className={classNames("card", { darkCard: checked })}>
      <h2
        className={classNames("caption", { darkCaption: checked })}
        contentEditable={editable}
      >
        {caption}
      </h2>

      <input
        type="checkbox"
        id="one"
        onChange={checkboxHandler}
        checked={checked}
      />

      <AiFillEdit
        id="two"
        color="#3f3f3f"
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
      >
        {text}
      </p>
    </div>
  );
}

export default Card;
