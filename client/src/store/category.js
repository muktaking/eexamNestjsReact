import { createSlice } from "@reduxjs/toolkit";

import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "Category",
  initialState: { categories: [], catHierarchy: [] },
  reducers: {
    getCategory: (state, action) => {
      state.categories = action.payload.categories;
      state.catHierarchy = action.payload.catHierarchy;
    },
  },
});

export const { getCategory } = slice.actions;
export default slice.reducer;

const url = "/categories";
const method = "get";
export const fetchCategory = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url,
      method,
      onSuccess: getCategory.type,
    })
  );
};

export const createCategory = (data) => (dispatch) => {
  dispatch(
    apiCallBegun({
      url,
      method: "post",
      data,
      sendToken: true,
    })
  );
};
