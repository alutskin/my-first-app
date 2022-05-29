import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        apiKey: "AIzaSyD2a1gRPwPR16VReRdj5csqlWmqS12VvL0",
        token: sessionStorage.getItem('token'),
        userName: sessionStorage.getItem('userName'),
        isAdmin: sessionStorage.getItem('userName') === "testAdmin@gmail.com",
    },
    reducers: {
        signIn: (state, action) => {
            state.token = action.payload.token;
            state.userName = action.payload.userName;
            state.isAdmin = action.payload.userName === "testAdmin@gmail.com";

            sessionStorage.setItem('token', action.payload.token);
            sessionStorage.setItem('userName', action.payload.userName);
        },
        signOut: (state) => {
            state.token = null;
            state.userName = null;
            state.isAdmin = false;
            sessionStorage.clear();
        },
    }
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;