import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import Category from "../../types/Category";

export const getProductCategories = createAsyncThunk(
  "getProductCategories",
  async () => {
    try {
      const response = await axios.get<any, AxiosResponse<Category[]>>(
        `https://api.escuelajs.co/api/v1/categories`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);
