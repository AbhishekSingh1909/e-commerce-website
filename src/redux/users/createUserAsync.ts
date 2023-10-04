import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { Axios, AxiosError } from "axios";
import { User } from "../../types/User";
import { CreateNewUser } from "../../types/CreateNewUser";

export const createUsersAsync = createAsyncThunk(
  "users/createUsers",
  async (user: CreateNewUser, { rejectWithValue }) => {
    try {
      const response = await axios.post<User>(
        `https://api.escuelajs.co/api/v1/users/`,
        user
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return rejectWithValue(error);
    }
  }
);
