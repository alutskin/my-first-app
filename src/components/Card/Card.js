import { useState, memo, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

import classes from "./Card.module.css";
import CardHeader from "../CardHeader/CardHeader";
import CardBody from "../CardBody/CardBody";
import { rootActions } from "../../store/rootSlice";

function Card(props) {
  const id = props.id;
  const {
    caption,
    text,
    checked,
  } = useSelector((store) => store.root.cardsData.find(cardData => cardData.id === id));
  const readOnly = useSelector((store) => store.root.readOnly);
  const [editable, setEditable] = useState(false);
  const [curCaptionValue, setCurCaptionValue] = useState(caption);
  const [curTextValue, setCurTextValue] = useState(text);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const updateCheckedStatus = useCallback((status) => {
    dispatch(rootActions.updateCheckedStatus({ id, status }));
  }, [dispatch, id]);

  const updateContent = useCallback((newCaption, newText) => {
    dispatch(rootActions.updateCardContent({ id, newCaption, newText }));
  }, [dispatch, id]);

  const checkboxHandler = (event) => {
    if (event.target.checked) {
      updateCheckedStatus(true);
    } else {
      updateCheckedStatus(false);
    }
  };

  const editClickHandler = () => {
    setEditable(true);
    updateCheckedStatus(false);
  };

  const saveChangesHandler = () => {
    updateContent(curCaptionValue, curTextValue);
    setEditable(false);
  };

  const cancelChangesHandler = () => {
    setCurCaptionValue(caption);
    setCurTextValue(text);
    setEditable(false);
  };

  const captionChangeHandler = (event) => {
    setCurCaptionValue(event.target.value);
  };

  const textChangeHandler = (event) => {
    setCurTextValue(event.target.value);
  };

  const cardDoubleClickHandler = () => {
    if (!editable) {
      navigate(`/card/${id}`);
    }
  };

  if (editable && readOnly) {
    cancelChangesHandler();
  }

  return (
    <div
      className={`${classes.card} ${checked ? classes["dark-card"] : ""}`}
      onDoubleClick={cardDoubleClickHandler}
    >
      <CardHeader
        caption={curCaptionValue}
        checked={checked}
        editable={editable}
        captionChangeHandler={captionChangeHandler}
      />

      <input
        type="checkbox"
        className={classes["select-checkbox"]}
        checked={checked}
        style={editable ? { display: "none" } : { display: "inline" }}
        onChange={checkboxHandler}
      />

      <AiFillEdit
        className={classes["edit-icon"]}
        color={checked ? "#C0C0C0" : "#3f3f3f"}
        visibility={editable || readOnly ? "hidden" : "visible"}
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

      <hr
        color={checked ? "#C0C0C0" : "#3f3f3f"}
        className={classes.line}
      />

      <CardBody
        text={curTextValue}
        checked={checked}
        editable={editable}
        textChangeHandler={textChangeHandler}
      />
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.string,
};

export default memo(Card);
