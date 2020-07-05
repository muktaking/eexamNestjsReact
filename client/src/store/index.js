import { combineReducers } from "redux";
import authReducer from "./auth";
import apiReducer from "./api";
import miniInfoReducer from "./miniInfo";

export default combineReducers({
  api: apiReducer,
  auth: authReducer,
  miniInfo: miniInfoReducer,
});
