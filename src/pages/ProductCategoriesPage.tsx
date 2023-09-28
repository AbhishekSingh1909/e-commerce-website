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
import { useEffect, useMemo, useState } from "react";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";

const ProductCategory = () => {
  const dispatch = useAppDispatch();

  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    dispatch(getProductCategories());
  }, []);

  const { categories, error, loading } = useAppSelector(
    (state) => state.ProductCategoryReducer
  );

  const handleChange = (event: SelectChangeEvent) => {
    const id = event.target.value;
    console.log(event.target.value);
    setCategoryId(id);
    console.log("selected Category", categoryId);
  };

  return (
    <Box>
      {error && <Typography> {`There is a error : ${error}`}</Typography>}
      {loading && (
        <Box>
          <CircularProgress />
        </Box>
      )}
      {!error && !loading && (
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Choose Categories
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={categoryId}
              label="Categories"
              onChange={handleChange}
            >
              {categories?.map((c) => (
                <MenuItem value={c.id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default ProductCategory;
