import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "miniInfo",
  initialState: {
    totalExam: [0, 0],
    rank: [1, 100],
    upcomingExam: ["No Exam", "01-02-03"],
    result: [0.0, 100],
  },
  reducers: {
    miniInfo: (state, action) => {
      state.totalExam = action.payload.totalExam;
      state.rank = action.payload.rank;
      state.upcomingExam = action.payload.upcomingExam;
      state.result = action.payload.result;
    },
  },
});

export const { miniInfo } = slice.actions;

export default slice.reducer;

export const miniInfoLoader = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url: "/exams/miniinfo",
      method: "get",
      onSuccess: miniInfo.type,
      sendToken: true,
    })
  );

  // dispatch(apiCallBegun({
  //     url: '/exams/latest',
  //     method: 'get',
  //     onSuccess: .type

  // }));

  // dispatch(
  //   apiCallBegun({
  //     url: "/exams/latest",
  //     method: "get",
  //     onSuccess: upcomingExam.type,
  //   })
  // );

  // dispatch(apiCallBegun({
  //     url: '/exams/latets',
  //     method: 'get',
  //     onSuccess: totalExam.type

  // }));
};
