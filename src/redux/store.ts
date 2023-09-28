import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import productReducer from "./products/productsSlice";
import ProductCategoryReducer from "./productCategories/productCategorySlice";
import { persistReducer, persistStore } from "redux-persist";

// const store = configureStore({
//   reducer: { productReducer },
// });

const preConfig = {
  key: "root",
  storage,
  blacklist: ["productReducer", "ProductCategoryReducer"],
};

const rootReducer = combineReducers({
  productReducer,
  ProductCategoryReducer,
});

const persistedReducer = persistReducer(preConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

//to get the state from all reducers
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
