import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import Card from "../components/Card/Card";
import { rootReducer } from '../store/rootSlice';
import { authReducer } from '../store/authSlice';

const initCardsData = [
    {
        id: "test id",
        caption: "This is card header",
        text: "This is card body",
        checked: false,
    }
];
const INIT_STORE = {
    root: {
        cardsData: initCardsData,
        addingCard: false,
        readOnly: false,
    }
};
const INIT_UI = (
    <BrowserRouter>
        <Card 
            id="test id"
        />
    </BrowserRouter>
);

export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({ reducer: { root: rootReducer, auth: authReducer }, preloadedState }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export function updateStore(initUi = INIT_UI, initStore = INIT_STORE) {
    return renderWithProviders(
        initUi,
        {
            preloadedState: {
                ...initStore
            }
        }
    );
}
