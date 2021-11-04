import { useState } from "react";

import "./Card.css";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

function Card(props) {
  const [editable, setEditable] = useState(false);
  const [caption, setCaption] = useState(props.caption);
  const [text, setText] = useState(props.text);

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
    <div className="card">
      <h2 className="caption" contentEditable={editable}>
        {caption}
      </h2>
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
      <p className="text" contentEditable={editable}>
        {text}
      </p>
    </div>
  );
}

export default Card;
