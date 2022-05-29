import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootSlice";
import { authReducer } from "./authSlice";

const store = configureStore({ reducer: { root: rootReducer, auth: authReducer } });

export default store;
