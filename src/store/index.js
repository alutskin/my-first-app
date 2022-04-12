import { createStore, applyMiddleware } from "redux";
import { v4 as uuidv4 } from "uuid";
import thunk from "redux-thunk";

const INITIAL_STATE = {
  cardsData: [],
  addingCard: false,
  readOnly: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  const { type, ...payload } = action;
  console.log("Type: ", type, ". Params: ", payload);

  if (action.type === "update_card_content") {
    const newAppState = state.cardsData.slice();
    const card = newAppState.find((data) => data.id === action.id);
    card.caption = action.newCaption;
    card.text = action.newText;

    return {
      cardsData: newAppState,
      addingCard: state.addingCard,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "update_checked_status") {
    const newAppState = state.cardsData.slice();
    const card = newAppState.find((data) => data.id === action.id);
    card.checked = action.status;

    return {
      cardsData: newAppState,
      addingCard: state.addingCard,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "delete-selected-cards") {
    const newAppState = state.cardsData.filter(
      (data) => data.checked === false
    );

    return {
      cardsData: newAppState,
      addingCard: state.addingCard,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "add-new-card") {
    const newAppState = state.cardsData.slice();
    newAppState.unshift({
      id: uuidv4(),
      caption: action.caption,
      text: action.text,
      checked: false,
    });

    return {
      cardsData: newAppState,
      addingCard: false,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "start-add-new-card") {
    return {
      cardsData: state.cardsData,
      addingCard: true,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "close-add-new-card-window") {
    return {
      cardsData: state.cardsData,
      addingCard: false,
      readOnly: state.readOnly,
    };
  }

  if (action.type === "change-read-only-status") {
    return {
      cardsData: state.cardsData,
      addingCard: state.addingCard,
      readOnly: action.event.target.checked,
    };
  }

  if (action.type === "fetch-data") {
    return {
      cardsData: action.cards,
      addingCard: state.addingCard,
      readOnly: state.readOnly,
    };
  }

  return state;
};

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
