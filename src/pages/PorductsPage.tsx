import {
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Pagination,
  Stack,
  Typography,
  IconButton,
  InputBase,
  Paper,
  TextField,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";
import IProduct from "../types/Product";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import {
  getAllProductsAsync,
  sortByPrice,
} from "../redux/products/productReducer";
import { getProductCategoriesAsync } from "../redux/productCategories/getProductCategoriesAsync";
import { getProductsByCategoryAsync } from "../redux/products/getProductsByCategoryAsync";
import IPaginationQuery from "../types/Queries/PaginationQuery";
import BasicModal from "../components/Model/UpdateProductModel";
import FormDialog from "../components/Model/UpdateProductModel";
import UpdateProductModel from "../components/Model/UpdateProductModel";
import { DeleteProductModel } from "../components/Model/DeleteProductModel";
import { addToCart } from "../redux/cart/cartReducer";
import Product from "../types/Product";
import getFilteredProducts from "../selectors/getFilteredProducts";

interface ProductProps {
  categoryId: number | undefined;
  sortPrice: string;
}

const ProductsPage = ({ categoryId, sortPrice }: ProductProps) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<IProduct[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebouncedSearch] = useState("");
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.authReducer);

  const { products, error, loading } = useAppSelector(
    (state) => state.productReducer
  );
  // console.log("categoryId", categoryId);
  useEffect(() => {
    if (categoryId) {
      console.log("categoryId", categoryId);
      dispatch(getProductsByCategoryAsync(categoryId));
    } else {
      dispatch(getAllProductsAsync());
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(sortByPrice(sortPrice === "asc" ? "asc" : "desc"));
  }, [sortPrice]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedSearch(search);
    }, 100);

    return () => clearTimeout(timeOutId);
  }, [search]);

  const filterProducts = useAppSelector((state) =>
    getFilteredProducts(state, debounceSearch)
  );

  const pageCount = useMemo(() => {
    setHasMore(products.length > 0);

    const pageCount = Math.ceil(filterProducts.length / 10);

    const data = filterProducts?.slice(0, 10);
    setData(data);
    return pageCount;
  }, [products, debounceSearch]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    // show the count at per page
    // 0 - 10
    // 11 - 20
    const startIndex = (value - 1) * 10;

    const data = filterProducts?.slice(startIndex, value * 10);
    setData(data);
  };

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const handleSeachChange = (search: string) => {
    console.log("search Change");
    setSearch(search);
  };

  return (
    <main>
      <Container>
        <Container maxWidth="xs" sx={{ marginTop: "20px" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Prodcut by title"
              onChange={(e) => handleSeachChange(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Container>
        <Typography variant="h3">Products</Typography>;
        {error && <Typography> {`There is a error : ${error}`}</Typography>}
        {hasMore || (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {data && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              borderColor: "red",
              borderRadius: "20px",
            }}
          >
            {data?.map((p) => (
              <Box
                key={p.id + "" + p.title}
                sx={{
                  width: "30%",
                  hight: "10%",
                  padding: "1em",
                  alignItems: "center",
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: "grey",
                    color: "rgb(255, 236, 179)",
                    borderRadius: "5px",
                  }}
                >
                  <Typography
                  // sx={{
                  //   paddingLeft: "20%",
                  //   paddingRight: "20%",
                  // }}
                  >
                    {p.title}
                  </Typography>
                  <Box>
                    <Avatar
                      alt="Remy Sharp"
                      src={p.images[0]}
                      variant="square"
                      sx={{ display: "block", width: "100%", height: "5%" }}
                    />
                  </Box>
                  <Typography
                    sx={{ textAlign: "center" }}
                    // sx={{
                    //   paddingLeft: "20%",
                    //   paddingRight: "20%",
                    // }}
                  >
                    {p.price} €
                  </Typography>
                  {user?.role === "admin" && (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Stack spacing={1}>
                        <UpdateProductModel product={p} />
                      </Stack>
                      <Stack spacing={1}>
                        <DeleteProductModel product={p} />
                      </Stack>
                    </Box>
                  )}
                </CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{ marginLeft: "30%" }}
                    onClick={(e) => handleAddToCart(p)}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        )}
        {data && (
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography>Page: {page}</Typography>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              color="primary"
            />
          </Stack>
        )}
      </Container>
    </main>
  );
};

export default ProductsPage;
