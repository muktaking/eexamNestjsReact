import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    token: null,
    userId: null,
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

export const logoutLoader = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  dispatch(logout());
};
