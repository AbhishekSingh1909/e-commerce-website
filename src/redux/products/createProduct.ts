import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { CreateProduct } from "../../types/CreateProduct";

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (product: CreateProduct) => {
    try {
      const response = await axios.post(
        `https://api.escuelajs.co/api/v1/products/`,
        product
      );
      if (!response.data) {
        throw new Error("Could not add product");
      }
      console.log(response.data);
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);
