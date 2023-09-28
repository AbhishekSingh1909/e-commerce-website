import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";

import { getAllProducts } from "../redux/products/productsSlice";
import PaginationQuery from "../types/Queries/PaginationQuery";

const ProductsList = ({ limit, offset }: PaginationQuery) => {
  const dispatch = useAppDispatch();

  dispatch(getAllProducts({ limit, offset }));
};

export default ProductsList;
