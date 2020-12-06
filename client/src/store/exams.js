import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "Exams",
  initialState: {
    id: null,
    questions: [],
    singleQuestionMark: null,
    singleStemMark: null,
    penaltyMark: null,
    timeLimit: null,
    examResult: null,
    totalMark: null,
    totalScore: null,
    totalScorePercentage: null,
    error: null,
    exams: [],
  },
  reducers: {
    resetExamResult: (state, action) => {
      state.examResult = null;
      state.totalMark = null;
      state.totalScore = null;
      state.totalScorePercentage = null;
      state.error = null;
    },
    getAllExams: (state, action) => {
      state.exams = action.payload;
    },
    getExamById: (state, action) => {
      state.questions = action.payload.questions;
      state.id = action.payload.exam._id;
      state.singleQuestionMark = action.payload.exam.singleQuestionMark;
      state.singleStemMark = action.payload.exam.singleStemMark;
      state.timeLimit = action.payload.exam.timeLimit;
      state.penaltyMark = action.payload.exam.penaltyMark;
    },
    postExamById: (state, action) => {
      state.examResult = action.payload.resultArray;
      state.totalMark = action.payload.totalMark;
      state.totalScore = action.payload.totalScore;
      state.totalScorePercentage = action.payload.totalScorePercentage;
    },
    postExamError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  resetExamResult,
  getAllExams,
  getExamById,
  postExamById,
  postExamError,
} = slice.actions;

export default slice.reducer;

export const getAllExamsLoader = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/exams/",
      method: "get",
      sendToken: true,
      onSuccess: getAllExams.type,
    })
  );
};

export const getAllFreeExamsLoader = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/exams/free",
      method: "get",
      onSuccess: getAllExams.type,
    })
  );
};

export const getExamByIdLoader = (id) => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/exams/questions/" + id,
      method: "get",
      sendToken: true,
      onSuccess: getExamById.type,
    })
  );
};

export const postExamByIdLoader = (data) => (dispatch) => {
  console.log(data);
  dispatch(
    apiCallBegun({
      url: "/postexams",
      method: "post",
      data: data,
      sendToken: true,
      onSuccess: postExamById.type,
      onError: postExamError.type,
    })
  );
};

export const postFreeExamByIdLoader = (data) => (dispatch) => {
  console.log(data);
  dispatch(
    apiCallBegun({
      url: "/postexams/free",
      method: "post",
      data: data,
      onSuccess: postExamById.type,
      onError: postExamError.type,
    })
  );
};
