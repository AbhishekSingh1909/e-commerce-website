import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import SendIcon from "@mui/icons-material/Send";
import CancelIcon from "@mui/icons-material/Cancel";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import {
  Alert,
  Box,
  Collapse,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Stack,
  Tooltip,
} from "@mui/material";
import { useState } from "react";

import IProduct from "../../types/Product";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";

import { updateProductAsync } from "../../redux/products/productReducer";
import UpdateProduct, { ProductDto } from "../../types/UpdateProduct";
import Product from "../../types/Product";

export default function UpdateProductModel({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [title, setTitle] = React.useState(product.title);
  const [desc, setDesc] = React.useState(product.description);
  const [price, setPrice] = React.useState(product.price);
  const [categoryId, setCategoryId] = React.useState(product.category.id);
  const [updatedProduct, setUpdatedProduct] = useState<UpdateProduct>();
  const [showMessage, setShowMessage] = useState(false);
  // const [singleProduct, setSingleProduct] = React.useState<Product>(product);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(
    (state) => state.ProductCategoryReducer.categories
  );

  const { products, error } = useAppSelector((state) => state.productReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onCloseAlert = () => {
    setOpenAlert(false);
    setShowMessage(false);
  };

  const categoryHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setCategoryId(+id);
  };

  const saveChanges = () => {
    const productDto: ProductDto = {
      title: title,
      description: desc,
      price: price,
      categoryId: categoryId,
    };
    const updateProduct: UpdateProduct = {
      id: product.id,
      updateProduct: productDto,
    };
    setUpdatedProduct(updateProduct);
    setShowMessage(true);
    setOpenAlert(true);
    // if (!showMessage) {
    //   console.log("showMessage", showMessage);

    // }
  };

  React.useEffect(() => {
    if (updatedProduct) {
      dispatch(updateProductAsync(updatedProduct));
    }
    setOpen(false);
  }, [updatedProduct]);

  // const  show  = React.useMemo(() => {
  //   if (updatedProduct ) {

  //     setOpen(false);
  //     return true;
  //   }
  //   return false;
  // }, [updatedProduct]);
  console.log("show Message", showMessage);

  return (
    <main>
      <Box>
        {/* <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
          Update
        </Button> */}
        <Tooltip title="Edit">
          <IconButton color="secondary" onClick={handleClickOpen}>
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Dialog open={open} fullWidth>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            padding="2em"
          >
            <DialogTitle>Update the Product</DialogTitle>
            <TextField
              required
              id="title"
              label="Title"
              defaultValue={product.title}
              variant="filled"
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              defaultValue={product.description}
              onChange={(e) => setDesc(e.target.value)}
              sx={{ marginTop: "20px" }}
            />
            <TextField
              id="select-category"
              select
              variant="filled"
              defaultValue={product.category.name}
              value={categoryId}
              onChange={categoryHandleChange}
              sx={{ marginTop: "20px" }}
            >
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              defaultValue={`${product.price}`}
              onChange={(e) => setPrice(+e.target.value)}
              sx={{ marginTop: "20px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
            {/* <TextField
              id="url"
              label="Image Url"
              multiline
              maxRows={4}
              variant="filled"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              sx={{ marginTop: "20px" }}
            /> */}
          </Box>
          <DialogActions>
            <Button
              variant="contained"
              endIcon={<CancelIcon />}
              onClick={handleClose}
              color="error"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={saveChanges}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Box>
        {error && showMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Collapse in={openAlert}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      onCloseAlert();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Product is not Updated <br /> because {error}
              </Alert>
            </Collapse>
          </Stack>
        )}
        {products && showMessage && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Collapse in={openAlert}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      onCloseAlert();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                Product has been updated successfully
              </Alert>
            </Collapse>
          </Stack>
        )}
      </Box>
    </main>
  );
}
