import {
  Box,
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from "@mui/material";
import { getProductCategoriesAsync } from "../redux/productCategories/getProductCategoriesAsync";
import { useEffect, useState } from "react";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import ProductsPage from "./PorductsPage";
import { CreateProductModel } from "../components/Model/CreateProductModel";

const ProductCategory = () => {
  const dispatch = useAppDispatch();

  const [categoryId, setCategoryId] = useState<number>(0);
  const [priceSort, setPricePriceSort] = useState("");

  useEffect(() => {
    dispatch(getProductCategoriesAsync());
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
  };

  return (
    <main>
      <Box
      // sx={{
      //   display: "flex",
      //   alignItems: "end",
      //   flexDirection: "row",
      //   flexFlow: "wrap row",
      // }}
      >
        {/* {error && <Typography> {`There is a error : ${error}`}</Typography>}
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )} */}
        {categories && (
          <Box
            sx={{
              display: "flex",
              width: "50%",
              /* padding: 20px; */
              gap: "10px",
              marginLeft: "auto",
              marginTop: "2em",
            }}
          >
            {/* <FormControl fullWidth>
              
            </FormControl> */}
            <Box sx={{ width: "60%" }}>
              <CreateProductModel />
            </Box>

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
                value={categoryId === 0 ? "" : categoryId.toString()}
                label="Categories"
                onChange={filterHandleChange}
              >
                <MenuItem value="">
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
