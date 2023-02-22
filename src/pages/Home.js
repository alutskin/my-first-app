import React, { Fragment } from "react";

import Header from "../components/Header/Header";
import CardList from "../components/CardList/CardList";
import Panel from "../UI/Panel/Panel";
import NewCardModal from "../components/NewCardModal/NewCardModal";
import { useSelector, useDispatch } from "react-redux";
import Counter from "../components/Counter/Counter";
import Button from "../UI/Button/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { rootActions } from "../store/rootSlice";
import usePrompt from "../hooks/usePrompt";

const Home = () => {
  const addingCard = useSelector((store) => store.root.addingCard);
  const readOnly = useSelector(store => store.root.readOnly);
  const dispatch = useDispatch();
  usePrompt("Hey! What's up?", 2000);

  const startAddNewCardHandler = () => {
    dispatch(rootActions.startAddNewCard());
  };

  const deleteSeletedCardsHandler = () => {
    dispatch(rootActions.deleteSelectedCards());
  };

  return (
    <Fragment>
      {addingCard && <NewCardModal />}

      <Header text="Great Cards">
        <Counter />
      </Header>

      {!readOnly &&
        (<>
          <Panel>
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
        </>)
      }


      <CardList />
    </Fragment>
  );
};

export default Home;
