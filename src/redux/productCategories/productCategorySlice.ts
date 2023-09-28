import { createSlice } from "@reduxjs/toolkit";

import ICategory from "../../types/Category";
import { getProductCategories } from "./getProductCaregores";

const initialState: {
  categories: ICategory[];
  error?: string;
  loading: boolean;
} = {
  categories: [],
  loading: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductCategories.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          return {
            ...state,
            loading: false,
            categories: action.payload,
          };
        }
      })
      .addCase(getProductCategories.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProductCategories.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            error: action.payload.message,
            loading: false,
          };
        }
      });
  },
});

const ProductCategoryReducer = categorySlice.reducer;

export default ProductCategoryReducer;
