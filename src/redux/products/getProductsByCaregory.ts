import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import Product from "../../types/Product";

export const getProductsByCategory = createAsyncThunk(
  "products/getProductsByCategory",
  async (id: number) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product[]>>(
        `https://api.escuelajs.co/api/v1/categories/${id}/products`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);