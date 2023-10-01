import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId: number) => {
    try {
      const response = await axios.delete<boolean>(
        `https://api.escuelajs.co/api/v1/products/${productId}`
      );
      if (!response.data) {
        throw new Error("Could not delete product");
      }
      console.log("delete product", productId);
      return productId;
    } catch (e) {
      const error = e as Error;
      return error.message;
    }
  }
);
