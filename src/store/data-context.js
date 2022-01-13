import React, { useState, useEffect, useCallback } from "react";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const DataContext = React.createContext({
  cardsData: [],
  addingCard: false,
  readOnly: false,
  onUpdateContent: (newCaption, newText, id) => {},
  onUpdateCheckedStatus: (status, id) => {},
  onDeleteSelectedCards: () => {},
  onAddNewCard: (caption, text) => {},
  onStartAddNewCard: () => {},
  onCloseAddNewCardWindow: () => {},
  onSetReadOnlyStatus: () => {},
});

export const DataContextProvider = ({ children }) => {
  const [appState, setAppState] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [addingCard, setAddingCard] = useState(false);

  const getCards = useCallback(async () => {
    let cards = [];

    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json"
      );

      const data = response.data;

      for (let i = 0; i < 15; i++) {
        let card = {
          id: uuidv4(),
          caption: data[i].Name,
          text: data[i].About,
          checked: false,
        };

        cards.push(card);
      }
    } catch (error) {}

    setAppState(cards);
  }, []);

  useEffect(() => {
    getCards();
  }, [getCards]);

  const updateContentHandler = (newCaption, newText, id) => {
    const newAppState = appState.slice(0);
    const card = newAppState.find((data) => data.id === id);
    card.caption = newCaption;
    card.text = newText;
    setAppState(newAppState);
  };

  const updateCheckedStatusHandler = (status, id) => {
    const newAppState = appState.slice(0);
    const card = newAppState.find((data) => data.id === id);
    card.checked = status;
    setAppState(newAppState);
  };

  const deleteSelectedCardsHandler = () => {
    const newAppState = appState.filter((data) => data.checked === false);
    setAppState(newAppState);
  };

  const addNewCardHandler = (caption, text) => {
    const newAppState = appState.slice(0);
    newAppState.unshift({
      id: uuidv4(),
      caption: caption,
      text: text,
      checked: false,
    });
    setAddingCard(false);
    setAppState(newAppState);
  };

  const startAddNewCardHandler = () => {
    setAddingCard(true);
  };

  const closeAddNewCardWindowHandler = () => {
    setAddingCard(false);
  };

  const readOnlyStatusHandler = (event) => {
    if (event.target.checked) {
      setReadOnly(true);
    } else {
      setReadOnly(false);
    }
  };

  return (
    <DataContext.Provider
      value={{
        cardsData: appState,
        addingCard: addingCard,
        readOnly: readOnly,
        onUpdateContent: updateContentHandler,
        onUpdateCheckedStatus: updateCheckedStatusHandler,
        onDeleteSelectedCards: deleteSelectedCardsHandler,
        onAddNewCard: addNewCardHandler,
        onStartAddNewCard: startAddNewCardHandler,
        onCloseAddNewCardWindow: closeAddNewCardWindowHandler,
        onSetReadOnlyStatus: readOnlyStatusHandler,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
