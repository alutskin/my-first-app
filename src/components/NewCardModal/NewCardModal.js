import React, { useRef } from "react";

import classes from "./NewCardModal.module.css";

const NewCardModal = ({ onAddNewCard, onClose }) => {
    const headingValue = useRef();
    const cardBodyValue = useRef();

    const formSubmitHandler = (event) => {
        event.preventDefault();
        onAddNewCard(headingValue.current.value, cardBodyValue.current.value);
    };

  return (
    <React.Fragment>
      <div className={classes.background} onClick={onClose} />

      <div className={classes.modal}>
        <header>
          <h2>Создать новую карточку</h2>
        </header>

        <hr color="#C0C0C0" style={{borderWidth: "1.2px"}} />

        <form onSubmit={formSubmitHandler}>
          <div>
            <label htmlFor="heading">Заголовок:</label>
            <input id="heading" type="text" ref={headingValue} autoComplete="off" />
          </div>

          <div>
            <label htmlFor="body">Текст:</label>
            <textarea id="body" type="text" style={{height: "130px"}} ref={cardBodyValue} />
          </div>

          <button type="submit">Сохранить</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NewCardModal;
