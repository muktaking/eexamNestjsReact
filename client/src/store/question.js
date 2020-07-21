import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "Question",
  initialState: {
    questions: [],
    error: null,
  },
  reducers: {
    getQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

export const { getQuestions } = slice.actions;

export default slice.reducer;

export const getQuestionLoader = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/questions",
      method: "get",
      //sendToken: true,
      //data,
      //config,
      onSuccess: getQuestions.type,
    })
  );
};

export const getQuestionByCategoryLoader = (id) => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/questions/category/" + id,
      method: "get",
      //sendToken: true,
      //data,
      //config,
      onSuccess: getQuestions.type,
    })
  );
};

export const createQuestionLoader = (data) => (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const questionData = new FormData();
  Object.keys(data).forEach((key) => {
    data[key] && questionData.append(key, data[key]);
  });

  dispatch(
    apiCallBegun({
      url: "/questions",
      method: "post",
      sendToken: true,
      data,
      config,
    })
  );
};

export const uploadQuestionLoader = (data) => (dispatch) => {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  const questionData = new FormData();
  Object.keys(data).forEach((key) => {
    data[key] && questionData.append(key, data[key]);
  });

  dispatch(
    apiCallBegun({
      url: "/questions/files",
      method: "post",
      sendToken: true,
      data,
      config,
    })
  );
};
