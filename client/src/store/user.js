import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegun } from "./api";

const slice = createSlice({
  name: "user",
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    avatar: null,
  },
  reducers: {
    getUser: (user, action) => {
      user.id = action.payload._id;
      user.firstName = action.payload.firstName;
      user.lastName = action.payload.lastName;
      user.userName = action.payload.userName;
      user.email = action.payload.email;
      user.avatar =
        action.payload.avater ||
        "https://api.adorable.io/avatars/285/abott@adorable.png";
    },
  },
});
export const { getUser } = slice.actions;
export default slice.reducer;

const url = "/users";
const method = "get";

export const getUserLoader = () => (dispatch) => {
  dispatch(
    apiCallBegun({
      url,
      method,
      onSuccess: getUser.type,
      sendToken: true,
    })
  );
};
