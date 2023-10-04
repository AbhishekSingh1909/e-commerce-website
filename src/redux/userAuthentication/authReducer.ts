import { createSlice } from "@reduxjs/toolkit";

import { JWTToken, User, UserAuth } from "../../types/User";
import { userLogInAsync } from "./userLogInAsync";
import { authenticateUserAsync } from "./authenticateUserAsync";

type AuthType = {
  user?: User;
  error?: string;
};

const initialState: AuthType = {
  user: undefined,
  error: undefined,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = undefined;
      state.error = undefined;
      localStorage.removeItem("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogInAsync.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.user = action.payload;
      })
      .addCase(userLogInAsync.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.error = action.payload?.message;
      });
    builder
      .addCase(authenticateUserAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(authenticateUserAsync.rejected, (state, action) => {
        state.error = action.payload?.message;
      });
  },
});
const authReducer = authSlice.reducer;
export const { logOut } = authSlice.actions;
export const userAccess_token = (state: { auth: UserAuth }) =>
  state.auth.jwtToken?.access_token;
export const userRefresh_token = (state: { auth: UserAuth }) =>
  state.auth.jwtToken?.refresh_token;
export const currentUser = (state: { user: UserAuth }) => state.user.user;

export default authReducer;
