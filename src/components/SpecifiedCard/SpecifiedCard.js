import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillEdit,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineDoubleLeft,
} from "react-icons/ai";
import ContentEditable from "react-contenteditable";

import classes from "./SpecifiedCard.module.css";
import Panel from "../../UI/Panel/Panel";
import Button from "../../UI/Button/Button";
import { rootActions } from "../../store/rootSlice";

const SpecifiedCard = ({ cardData }) => {
  const [editable, setEditable] = useState(false);
  const [caption, setCaption] = useState(cardData.caption);
  const [text, setText] = useState(cardData.text);
  const readOnly = useSelector(store => store.root.readOnly);
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
  };

  const backHandler = () => {
    navigate(-1);
  };

  const captionChangeHandler = (event) => {
    setCaption(event.target.value);
  };

  const textChangeHandler = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <ContentEditable
        className={classes.caption}
        disabled={!editable}
        onChange={captionChangeHandler}
        html={caption}
        tagName="h1"
      />

      <hr className={classes.line} />

      <ContentEditable
        className={classes.text}
        disabled={!editable}
        onChange={textChangeHandler}
        html={text}
        tagName="p"
      />

      <hr className={classes.line} />

      <Panel>
        {!editable && (
          <Fragment>
            {!readOnly &&
              <Button text="Изменить" onClick={startEditCardHandler}>
                <AiFillEdit />
              </Button>
            }
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
