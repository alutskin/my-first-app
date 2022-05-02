import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AiFillEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineDoubleLeft,
} from "react-icons/ai";

import classes from "./SpecifiedCard.module.css";
import Panel from "../../UI/Panel/Panel";
import Button from "../../UI/Button/Button";
import { rootActions } from "../../store/rootSlice";

const SpecifiedCard = ({ cardData }) => {
  const [editable, setEditable] = useState(false);
  const [caption, setCaption] = useState(cardData.caption);
  const [text, setText] = useState(cardData.text);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const startEditCardHandler = () => {
    setEditable(true);
  };

  const saveCardChangesHandler = () => {
    setEditable(false);
    dispatch(rootActions.updateCardContent({
      id: cardData.id,
      newCaption: caption,
      newText: text,
    }));
  };

  const cancelCardChangesHandler = () => {
    setEditable(false);
    setCaption(cardData.caption);
    setText(cardData.text);
    dispatch(rootActions.updateCardContent({
      id: cardData.id,
      newCaption: cardData.caption + " ",
      newText: cardData.text + " ",
    }));
  };

  const backHandler = () => {
    navigate(-1);
  };

  const captionChangeHandler = (event) => {
    setCaption(event.target.textContent);
  };

  const textChangeHandler = (event) => {
    setText(event.target.textContent);
  };

  return (
    <div className={classes.wrapper}>
      <h1
        className={classes.caption}
        contentEditable={editable}
        onKeyUp={captionChangeHandler}
      >
        {cardData.caption}
      </h1>
      <hr className={classes.line} />

      <p
        className={classes.text}
        contentEditable={editable}
        onKeyUp={textChangeHandler}
      >
        {cardData.text}
      </p>
      <hr className={classes.line} />

      <Panel>
        {!editable && (
          <Fragment>
            <Button text="Изменить" onClick={startEditCardHandler}>
              <AiFillEdit />
            </Button>
            <Button text="Назад" onClick={backHandler}>
              <AiOutlineDoubleLeft />
            </Button>
          </Fragment>
        )}
        {editable && (
          <Fragment>
            <Button text="Сохранить" onClick={saveCardChangesHandler}>
              <AiFillCheckCircle />
            </Button>
            <Button text="Отменить" onClick={cancelCardChangesHandler}>
              <AiFillCloseCircle />
            </Button>
          </Fragment>
        )}
      </Panel>
    </div>
  );
};

export default SpecifiedCard;
