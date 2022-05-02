import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";

// const { type, ...payload } = action;
// console.log("Type: ", type, ". Params: ", payload);

const store = configureStore({ reducer: { root: rootReducer } });

export default store;
