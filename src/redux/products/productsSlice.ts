import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

import IPaginationQuery from "../../types/Queries/PaginationQuery";
import { getProductsByCategory } from "./getProductsByCaregory";
import UpdateProduct from "../../types/UpdateProduct";
import Product from "../../types/Product";
import { createProduct } from "./createProduct";
import { deleteProduct } from "./deleteProduct";

const initialState: {
  products: Product[];
  error?: string;
  loading: boolean;
} = {
  products: [],
  loading: false,
};

export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async ({ limit, offset }: IPaginationQuery) => {
    try {
      const response = await axios.get<any, AxiosResponse<Product[]>>(
        `https://api.escuelajs.co/api/v1/products`
      );
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (params: UpdateProduct) => {
    try {
      const response = await axios.put(
        `https://api.escuelajs.co/api/v1/products/${params.id}`,
        params.updateProduct
      );
      if (!response.data) {
        throw new Error("Could not update product");
      }
      return response.data;
    } catch (e) {
      const error = e as Error;
      return error.message;
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
      .addCase(createProduct.fulfilled, (state, action) => {
        if (!(action.payload instanceof Error)) {
          const foundIndex = state.products.findIndex(
            (p) => p.id === action.payload.id
          );

          if (foundIndex === -1) {
            state.products.push(action.payload);
          }
        }
      })
      .addCase(createProduct.rejected, (state, action) => {
        if (action.payload instanceof Error) {
          return {
            ...state,
            error: action.payload.message,
            loading: false,
          };
        }
      });
    builder
      .addCase(updateProduct.fulfilled, (state, action) => {
        const foundIndex = state.products.findIndex(
          (p) => p.id === action.payload.id
        );

        if (foundIndex !== -1) {
          state.products[foundIndex] = action.payload;
        }
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
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (typeof action.payload === "number") {
          state.products = state.products.filter(
            (p) => p.id !== action.payload
          );
        }
      })
      .addCase(deleteProduct.rejected, (state, action) => {
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
