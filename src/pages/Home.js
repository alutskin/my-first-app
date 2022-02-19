import React, { Fragment } from "react";

import Header from "../components/Header/Header";
import CardList from "../components/CardList/CardList";
import Panel from "../UI/Panel/Panel";
import NewCardModal from "../components/NewCardModal/NewCardModal";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Counter from "../components/Counter/Counter";
import Button from "../UI/Button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

const ReadOnlyCheckbox = React.memo(styled.input`
  margin-right: 10px;
  height: 16px;
  width: 16px;
  box-shadow: 1px 1px 4px rgb(22, 22, 22);
`);

const Home = () => {
  const addingCard = useSelector((store) => store.addingCard);
  const dispatch = useDispatch();

  const changeReadOnlyStatusHandler = (event) => {
    dispatch({ type: "change-read-only-status", event });
  };

  const startAddNewCardHandler = () => {
    dispatch({ type: "start-add-new-card" });
  };

  const deleteSeletedCardsHandler = () => {
    dispatch({ type: "delete-selected-cards" });
  };

  return (
    <Fragment>
      {addingCard && <NewCardModal />}

      <Header text="Great Cards">
        <Counter />
      </Header>

      <Panel>
        <div style={{ marginRight: "auto" }}>
          <ReadOnlyCheckbox
            id="read-only"
            type="checkbox"
            onChange={changeReadOnlyStatusHandler}
          />
          <label htmlFor="read-only">Только просмотр</label>
        </div>

        <Button text="Добавить карточку" onClick={startAddNewCardHandler}>
          <AiFillPlusCircle />
        </Button>

        <Button
          text="Удалить выбранные карточки"
          onClick={deleteSeletedCardsHandler}
        >
          <AiFillDelete />
        </Button>
      </Panel>

      <hr color="#c0c0c0" size="5" />

      <CardList />
    </Fragment>
  );
};

export default Home;
