import { Reducer, combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";

import productReducer from "./products/productReducer";
import ProductCategoryReducer from "./productCategories/categoryReducer";

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

const persistedReducer: Reducer<AppState, any> = persistReducer(
  preConfig,
  rootReducer
);

export const createStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

//get Store
const store = createStore();
//to get the state from all reducers
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
