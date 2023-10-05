import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { createUsersAsync } from "./createUserAsync";
import { AxiosError } from "axios";
import { updateUserAsync } from "./updateUserAsync";
import { getAllUsersAsync } from "./getAllUsersAsync";
import { getSingleUsersAsync } from "./getSingleUserAsync";

const initialState: {
  users: User[];
  error?: string;
  loading: boolean;
  singleUser?: User;
} = {
  users: [],
  loading: false,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUsersAsync.fulfilled, (state, action) => {
        console.log("createUsersAsync.fulfilled");
        const foundIndex = state.users.findIndex(
          (p) => p.id === action.payload.id
        );

        if (foundIndex === -1) {
          state.users.push(action.payload);
        }
      })
      .addCase(createUsersAsync.rejected, (state, action) => {
        console.log("createUsersAsync.rejected");
        state.error = action.payload?.message;
      });
    builder
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const foundIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        console.log("update foundInex", foundIndex);
        if (foundIndex !== -1) {
          state.users[foundIndex] = action.payload;
        }
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        console.log("updateUserAsync.rejected");
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        }
      });
    builder
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          state.error = action.payload.message;
        }
      })
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.loading = true;
      });
    builder
      .addCase(getSingleUsersAsync.fulfilled, (state, action) => {
        state.singleUser = action.payload;
      })
      .addCase(getSingleUsersAsync.rejected, (state, action) => {
        if (action.payload instanceof AxiosError) {
          state.error = action.payload.message;
        }
      });
  },
});

const userReducer = userSlice.reducer;
export default userReducer;
