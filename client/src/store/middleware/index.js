/*

it is an simple api middleware to generalize get and send data to server



*/

import axios from "axios";

import { apiCallBegun, apiCallSuccess, apiCallFail } from "../api";

import { authSuccess } from "../auth";

import setAuthorizationToken from "../../utils/setAuthorizationToken";

//api middleware function

export const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegun.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    sendToken,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    if (sendToken) {
      const token = localStorage.getItem("jwtToken");
      setAuthorizationToken(token);
    }
    const response = await axios.request({
      baseURL: "http://localhost:4000/",
      url,
      method,
      data,
    });

    dispatch(apiCallSuccess(response.data));

    if (onSuccess) {
      if (onSuccess === authSuccess.type) {
        localStorage.setItem("jwtToken", response.data.accessToken);
      }
      dispatch({ type: onSuccess, payload: response.data });
    }
  } catch (error) {
    dispatch(apiCallFail(error));
    if (onError) dispatch({ type: onError, payload: error });
  }
};
