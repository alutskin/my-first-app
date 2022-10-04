import React from 'react';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { rootReducer } from '../store/rootSlice';
import { authReducer } from '../store/authSlice';

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

export function updateStore(initUi, initStore = null) {
    return renderWithProviders(
        initUi,
        {
            preloadedState: {
                ...initStore
            }
        }
    );
}
