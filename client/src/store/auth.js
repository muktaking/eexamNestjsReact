import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    userId: null,
    role: null,
    error: null,
  },
  reducers: {
    authStart: (auth) => {
      auth.loading = true;
    },
    authSuccess: (auth, action) => {
      auth.loading = false;
      auth.token = action.payload.accessToken;
      auth.userId = action.payload.id;
      auth.role = action.payload.role;
      auth.expireIn = action.payload.expireIn;
      auth.error = null;
    },
    authFail: (auth, action) => {
      auth.loading = false;
      auth.error = action.payload;
    },
    logout: (auth) => {
      auth.token = null;
      auth.userId = null;
      auth.expireIn = null;
    },
  },
});

export const { authStart, authSuccess, authFail, logout } = slice.actions;

export default slice.reducer;

//declaring some variable

const url = "/auth/login";
const method = "post";

export const auth = (username, password) => (dispatch) => {
  const authData = {
    username,
    password,
  };
  dispatch(
    apiCallBegun({
      url,
      method,
      data: authData,
      onStart: authStart.type,
      onSuccess: authSuccess.type,
      onError: authFail.type,
    })
  );
};
export const autoAuth = () => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    dispatch(
      authSuccess({
        token,
      })
    );
  }
};

export const checkAuthTimeOut = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    dispatch(logout);
  } else {
    const expirationDate = new Date(localStorage.getItem("expirationDate"));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess({ accessToken: token, id: userId }));
      dispatch(
        checkAuthTimeOut(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(logout());
    }
  }
};

export const logoutLoader = () => (dispatch) => {
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  localStorage.removeItem("jwtToken");
  dispatch(logout());
};
