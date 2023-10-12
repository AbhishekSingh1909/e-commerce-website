import { AppState } from "../redux/store";

const getFilteredProducts = (state: AppState, search?: string) => {
  return state.productReducer.products.filter((p) =>
    p.title.toLowerCase().includes(search?.toLowerCase() || "")
  );
};

export default getFilteredProducts;
