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
import { getProductCategories } from "../redux/productCategories/getProductCaregores";
import {
  ProductsByCategory,
  getProductsByCategory,
} from "../redux/products/getProductsByCaregory";
import IPaginationQuery from "../types/Queries/PaginationQuery";

interface ProductProps {
  categoryId: number | undefined;
  sortPrice: string;
}

const ProductsPage = ({ categoryId, sortPrice }: ProductProps) => {
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
  // console.log("categoryId", categoryId);
  useEffect(() => {
    if (categoryId && categoryId > 0) {
      console.log("products filter", products.length);
      const pagination: IPaginationQuery = { limit: 5, offset: offset };
      const productsByCategory: ProductsByCategory = {
        id: categoryId,
        pagination,
      };
      dispatch(getProductsByCategory(productsByCategory));
    } else {
      console.log("products normal", products.length);
      dispatch(getAllProducts({ limit: 5, offset: offset }));
    }
  }, [page, categoryId]);

  const loadedProducts = useMemo(() => {
    if (categoryId && categoryId > 0 && page === 1) {
      console.log("if Page Category", page, categoryId);
      console.log("if before data", data.length);
      console.log("if before products", products.length);
      setData([]);
      //setData(products);
      console.log(" if After", data.length);
    } else {
      setData((prev) => [...prev, ...products]);
      console.log("else before data", data.length);
    }
    setHasMore(products.length > 0);

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
                key={p.id + "" + p.title}
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
