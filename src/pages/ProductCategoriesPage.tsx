import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { getProductCategories } from "../redux/productCategories/getProductCaregores";
import { useEffect, useState } from "react";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import ProductsPage from "./PorductsPage";

const ProductCategory = () => {
  const dispatch = useAppDispatch();

  const [categoryId, setCategoryId] = useState<number>(0);
  const [priceSort, setPricePriceSort] = useState("");

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  const { categories, error, loading } = useAppSelector(
    (state) => state.ProductCategoryReducer
  );

  const filterHandleChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    setCategoryId(+id);
  };

  const priceHandleChange = (event: SelectChangeEvent) => {
    setPricePriceSort(event.target.value);

    console.log(priceSort);
  };

  return (
    <main>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          flexDirection: "row",
          flexFlow: "wrap row",
        }}
      >
        {/* {error && <Typography> {`There is a error : ${error}`}</Typography>}
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )} */}
        {!error && !loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "row",
              flexFlow: "wrap row",
              justifyContent: "space-between",
              width: "20%",

              marginTop: "2em",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-select-price-sorting-standard-label">
                By Price
              </InputLabel>
              <Select
                labelId="select-price-sorting"
                id="demo-select-price-sorting"
                value={priceSort}
                label="Price"
                onChange={priceHandleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="asc">Low to High</MenuItem>
                <MenuItem value="desc">High to Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Choose Categories
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoryId?.toString()}
                label="Categories"
                onChange={filterHandleChange}
              >
                <MenuItem value={0}>
                  <em>None</em>
                </MenuItem>
                {categories?.map((c) => (
                  <MenuItem value={c.id} key={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      </Box>
      <ProductsPage categoryId={categoryId} sortPrice={priceSort} />
    </main>
  );
};

export default ProductCategory;
