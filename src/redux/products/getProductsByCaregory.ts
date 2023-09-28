import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import IProduct from "../../types/Product";
import IPaginationQuery from "../../types/Queries/PaginationQuery";

export interface ProductsByCategory {
  id: number;
  pagination: IPaginationQuery;
}

export const getProductsByCategory = createAsyncThunk(
  "getProductsByCategory",
  async (productsByCategory: ProductsByCategory) => {
    try {
      const response = await axios.get<any, AxiosResponse<IProduct[]>>(
        `https://api.escuelajs.co/api/v1/categories/${productsByCategory.id}/products?limit=${productsByCategory.pagination.limit}&offset=${productsByCategory.pagination.offset}`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);
