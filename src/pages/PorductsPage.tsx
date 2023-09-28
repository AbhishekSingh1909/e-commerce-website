import {
  Avatar,
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";
import IProduct from "../types/Product";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { getAllProducts } from "../redux/products/productsSlice";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [data, setData] = useState<IProduct[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  // ProductsList({ limit: 20, offset: 0 });
  const dispatch = useAppDispatch();

  const { products, error, loading } = useAppSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    console.log("products", products.length);
    dispatch(getAllProducts({ limit: 5, offset: offset }));
  }, [page]);

  const loadedProducts = useMemo(() => {
    setHasMore(products.length > 0);
    setData((prev) => [...prev, ...products]);
    return data;
  }, [products]);

  const loadMoreOnClick = () => {
    // prevent click if the state is loading
    if (loading) return;
    setPage((prev) => prev + 1);
    console.log("page", page);
    setOffset(page * 5);
  };

  return (
    <main>
      <Container>
        <Typography variant="h3">Products</Typography>;
        {error && <Typography> {`There is a error : ${error}`}</Typography>}
        {hasMore || (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {loadedProducts && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              borderColor: "red",
              borderRadius: "20px",
            }}
          >
            {loadedProducts?.map((p) => (
              <Box
                key={p.id}
                sx={{
                  width: "30%",
                  hight: "10%",
                  padding: "1em",
                  alignItems: "center",
                }}
              >
                <CardContent
                  sx={{ backgroundColor: "grey", color: "rgb(255, 236, 179)" }}
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
                      sx={{ display: "block", width: "100%", height: "10%" }}
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
                </CardContent>
                <Stack spacing={2}>
                  <Button variant="contained">Update Product</Button>
                </Stack>
              </Box>
            ))}
          </Box>
        )}
        {hasMore && (
          <Stack spacing={2}>
            <Button color="secondary" onClick={loadMoreOnClick}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          </Stack>
        )}
      </Container>
    </main>
  );
};

export default ProductsPage;
