/*

it is an simple api middleware to generalize get and send data to server



*/

import axios from "axios";

import { apiCallBegun, apiCallSuccess, apiCallFail } from "../api";

import { authSuccess, checkAuthTimeOut } from "../auth";

import setAuthorizationToken from "../../utils/setAuthorizationToken";

//api middleware function

export const api = ({ getState, dispatch }) => (next) => async (action) => {
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
      setAuthorizationToken(getState().auth.token);
    }
    // let imageData;
    // if (data && data.image) {
    //   imageData = new FormData();
    //   Object.keys().forEach((e) => {
    //     imageData.append(e, data[e]);
    //   });
    //   console.log(imageData);
    //   data = imageData;
    // }

    const response = await axios.request({
      baseURL: "http://localhost:4000/",
      url,
      method,
      data,
    });

    dispatch(apiCallSuccess(response.data));

    if (onSuccess) {
      if (onSuccess === authSuccess.type) {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expireIn * 1000
        );
        localStorage.setItem("jwtToken", response.data.accessToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.id);
        dispatch(checkAuthTimeOut(response.data.expireIn));
      }
      dispatch({ type: onSuccess, payload: response.data });
    }
  } catch (error) {
    dispatch(apiCallFail(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};
