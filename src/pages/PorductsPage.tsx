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
} from "@mui/material";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useEffect, useMemo, useState } from "react";
import IProduct from "../types/Product";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { getAllProducts, sortByPrice } from "../redux/products/productsSlice";
import { getProductCategories } from "../redux/productCategories/getCaregories";
import { getProductsByCategory } from "../redux/products/getProductsByCaregory";
import IPaginationQuery from "../types/Queries/PaginationQuery";
import BasicModal from "../components/Model/UpdateProductModel";
import FormDialog from "../components/Model/UpdateProductModel";
import UpdateProductModel from "../components/Model/UpdateProductModel";
import { DeleteProductModel } from "../components/Model/DeleteProductModel";

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
    if (categoryId) {
      console.log("categoryId", categoryId);
      dispatch(getProductsByCategory(categoryId));
    } else {
      dispatch(getAllProducts({ limit: 5, offset: offset }));
    }
  }, [categoryId]);

  useEffect(() => {
    dispatch(sortByPrice(sortPrice === "asc" ? "asc" : "desc"));
  }, [sortPrice]);

  const pageCount = useMemo(() => {
    setHasMore(products.length > 0);
    const pageCount = Math.ceil(products.length / 10);

    const data = products?.slice(0, 10);
    setData(data);
    return pageCount;
  }, [products]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);

    // show the count at per page
    // 0 - 10
    // 11 - 20
    const startIndex = (value - 1) * 10;

    const data = products?.slice(startIndex, value * 10);
    setData(data);
  };

  return (
    <main>
      <Container>
        <Typography variant="h3">Products</Typography>;
        {error && <Typography> {`There is a error : ${error}`}</Typography>}
        {loading && (
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
                </CardContent>
              </Box>
            ))}
          </Box>
        )}
        {!loading && !error && (
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
