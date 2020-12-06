import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "ExamPaper",
  initialState: {
    questions: [],
    ids: [],
    success: null,
    error: null,
  },
  reducers: {
    selectedQuestions: (state, action) => {
      state.questions = action.payload.questions;
      state.ids = action.payload.ids;
    },
    onSuccess: (state, action) => {
      state.success = action.payload;
    },
    onError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { selectedQuestions, onSuccess, onError } = slice.actions;

export default slice.reducer;

export const selectedQuestionsLoader = (questions, ids) => (dispatch) => {
  dispatch(selectedQuestions({ questions, ids }));
};

export const postExamProfile = (examSpec, questions) => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/exams",
      method: "post",
      data: { ...examSpec, questions },
      onSuccess: onSuccess.type,
      onError: onError.type,
      sendToken: true,
    })
  );
};
