import { createAsyncThunk } from "@reduxjs/toolkit";

import axios, { Axios, AxiosError } from "axios";
import { User } from "../../types/User";

export const getAllUsersAsync = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    try {
      const response = await axios.get<User[]>(
        "https://api.escuelajs.co/api/v1/users"
      );
      return response.data;
    } catch (e) {
      const error = e as AxiosError;
      return error;
    }
  }
);
