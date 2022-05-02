import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
  cardsData: [],
  addingCard: false,
  readOnly: false,
};

const rootSlice = createSlice({
  name: 'root',
  initialState: INITIAL_STATE,
  reducers: {
    updateCardContent: (state, action) => {
      const card = state.cardsData.find((data) => data.id === action.payload.id);
      card.caption = action.payload.newCaption;
      card.text = action.payload.newText;
    },
    updateCheckedStatus: (state, action) => {
      const card = state.cardsData.find((data) => data.id === action.payload.id);
      card.checked = action.payload.status;
    },
    deleteSelectedCards: (state) => {
      state.cardsData = state.cardsData.filter((data) => data.checked === false);
    },
    startAddNewCard: (state) => {
      state.addingCard = true;
    },
    addNewCard: (state, action) => {
      state.cardsData.unshift({
        id: uuidv4(),
        caption: action.payload.caption,
        text: action.payload.text,
        checked: false,
      });
    },
    closeAddNewCardWindow: (state) => {
      state.addingCard = false;
    },
    changeReadOnlyStatus: (state, action) => {
      state.readOnly = action.payload.target.checked;
    },
    fetchData: (state, action) => {
      state.cardsData = action.payload;
    },
  }
});

export const rootReducer = rootSlice.reducer;
export const rootActions = rootSlice.actions;