import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "api",
  initialState: {},
  reducers: {
    apiCallBegun: (api, action) => {
      //api.loading = true;
    },
    apiCallSuccess: (api, action) => {
      //api.loading = false;
    },
    apiCallFail: (api, action) => {
      //api.loading = false;
    },
  },
});

export const { apiCallBegun, apiCallSuccess, apiCallFail } = slice.actions;

export default slice.reducer;
