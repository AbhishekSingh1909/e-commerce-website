import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import IProduct from "../../types/Product";
import IPaginationQuery from "../../types/Queries/PaginationQuery";
import IUpdateProduct from "../../types/UpdateProduct";
import { getProductsByCategory } from "./getProductsByCaregory";

const initialState: {
  products: IProduct[];
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

export const getAllProducts = createAsyncThunk(
  "getAllProducts",
  async ({ limit, offset }: IPaginationQuery) => {
    try {
      const response = await axios.get<any, AxiosResponse<IProduct[]>>(
        `https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${limit}`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "updateProduct",
  async (parameter: IUpdateProduct): Promise<IProduct> => {
    try {
      const product = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${parameter.id}`
      );
      return product.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortByPrice: (state, action: PayloadAction<"asc" | "desc">) => {
      if (action.payload.toLowerCase() === "asc") {
        state.products.sort((a, b) => a.price - b.price);
      } else {
        state.products.sort((a, b) => b.price - a.price);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          loading: false,
          products: action.payload,
        };
      }
    });

    builder.addCase(getAllProducts.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(getAllProducts.rejected, (state, action) => {
      if (action.payload instanceof Error)
        return {
          ...state,
          error: action.payload.message,
          loading: false,
        };
    });
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const foundIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (foundIndex !== -1) {
          state.products[foundIndex] = action.payload;
        }

        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateProduct.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProduct.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            error: action.payload.message,
            loading: false,
          };
        }
      });
    builder
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          return {
            ...state,
            loading: false,
            products: action.payload,
          };
        }
      })
      .addCase(getProductsByCategory.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        if (action.payload instanceof Error)
          return {
            ...state,
            error: action.payload.message,
            loading: false,
          };
      });
  },
});

const productReducer = productsSlice.reducer;
export const { sortByPrice } = productsSlice.actions;

export default productReducer;
