import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CssBaseline,
  Stack,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useEffect } from "react";
import { getAllProductsAsync } from "../redux/products/productReducer";
import { Link } from "react-router-dom";
import CarouselImages from "./CarouseImages";

const Home = () => {
  const { categories, error, loading } = useAppSelector(
    (state) => state.ProductCategoryReducer
  );
  const images: string[] = [
    "https://cdn.pixabay.com/photo/2017/03/01/09/11/shop-2107911_1280.png",
    "https://cdn.pixabay.com/photo/2016/03/22/09/08/online-store-1272390_1280.png",
    "https://cdn.pixabay.com/photo/2019/04/26/07/14/store-4156934_1280.png",
  ];
  const dispatch = useAppDispatch();
  dispatch(getAllProductsAsync());

  return (
    <main>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",

            justifyContent: "space-evenly",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <CarouselImages images={images} />
        </Box>

        {/* /* <Card sx={{ margin: "20px" }}>
          <CardMedia
            component="img"
            height="400"
            image=" https://cdn.pixabay.com/photo/2017/03/01/09/11/shop-2107911_1280.png"
            alt="My Shopping Website"
          /> */}

        <Box sx={{ textAlign: "center" }}>
          <CssBaseline />
          <Typography gutterBottom variant="h2" component="div" color="#ab003c">
            <Button component={Link} to="/products">
              Visit Our Store
            </Button>
          </Typography>
        </Box>
      </Box>
    </main>
  );
};
export default Home;
