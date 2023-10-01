import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import Product from "../../types/Product";

export const getSingleProductById = createAsyncThunk(
  "products/getSingleProductById",
  async (productId: number) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product[]>>(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);
