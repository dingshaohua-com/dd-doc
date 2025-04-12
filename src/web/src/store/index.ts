import { configureStore, createReducer } from "@reduxjs/toolkit";
import { setToken, setLoginUser } from './action-creator'

// state
const loginUserStorage = localStorage.getItem('loginUser');
const initialState = {
  token: localStorage.getItem('token') || null,
  loginUser: loginUserStorage ? JSON.parse(loginUserStorage) : null
};

// reducer
const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setToken, (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    })
    .addCase(setLoginUser, (state, action) => {
      state.loginUser = action.payload;
      localStorage.setItem('loginUser', JSON.stringify(action.payload))
    })
})

// store
export default configureStore({ reducer });