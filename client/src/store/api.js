import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "api",
  initialState: { error: null },
  reducers: {
    apiCallBegun: (api, action) => {
      //api.loading = true;
    },
    apiCallSuccess: (api, action) => {
      //api.loading = false;
    },
    apiCallFail: (api, action) => {
      api.error = action.payload.message;
    },
  },
});

export const { apiCallBegun, apiCallSuccess, apiCallFail } = slice.actions;

export default slice.reducer;
