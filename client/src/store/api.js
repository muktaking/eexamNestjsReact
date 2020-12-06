import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "api",
  initialState: { result: null, error: null },
  reducers: {
    apiCallBegun: (api, action) => {
      //api.loading = true;
    },
    apiCallSuccess: (api, action) => {
      //api.loading = false;
      api.result = action.payload;
    },
    apiCallFail: (api, action) => {
      api.error = action.payload;
    },
  },
});

export const { apiCallBegun, apiCallSuccess, apiCallFail } = slice.actions;

export default slice.reducer;
