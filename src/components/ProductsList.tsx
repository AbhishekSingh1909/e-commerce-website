import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";

import { getAllProducts } from "../redux/products/productReducer";
import PaginationQuery from "../types/Queries/PaginationQuery";

const ProductsList = ({ limit, offset }: PaginationQuery) => {
  const dispatch = useAppDispatch();

  dispatch(getAllProducts());
};

export default ProductsList;
