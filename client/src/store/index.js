import { combineReducers } from "redux";
import authReducer from "./auth";
import apiReducer from "./api";
import miniInfoReducer from "./miniInfo";
import userReducer from "./user";
import categoryReducer from "./category";
import questionReducer from "./question";
import examPaperReducer from "./examPaper";
import examsReducer from "./exams";

export default combineReducers({
  api: apiReducer,
  auth: authReducer,
  miniInfo: miniInfoReducer,
  user: userReducer,
  category: categoryReducer,
  question: questionReducer,
  examPaper: examPaperReducer,
  exams: examsReducer,
});
