import {
  Alert,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import React, { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CloseIcon from "@mui/icons-material/Close";

import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import Product from "../../types/Product";
import { deleteProductAsync } from "../../redux/products/deleteProductAsync";

export const DeleteProductModel = ({ product }: { product: Product }) => {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(true);
  const [showMessage, setShowMessage] = React.useState(false);

  const dispatch = useAppDispatch();

  const { products, error } = useAppSelector((state) => state.productReducer);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCloseAlert = () => {
    setOpenAlert(false);
  };

  const deletedProduct = () => {
    if (product) {
      dispatch(deleteProductAsync(product.id));
    }
  };

  return (
    <main>
      <Box>
        {/* <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
          onClick={handleClickOpen}
        >
          Delete
        </Button> */}
        <Tooltip title="Delete">
          <IconButton color="error" size="large" onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>

        <Dialog open={open} fullWidth>
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            padding="2em"
          >
            <DialogTitle>Do you want to delete the product?</DialogTitle>
            <TextField
              id="title"
              label="Title"
              variant="filled"
              value={product.title}
            />

            <TextField
              id="desc"
              label="Description"
              multiline
              maxRows={4}
              variant="filled"
              value={product.description}
              sx={{ marginTop: "20px" }}
            />
            <TextField
              id="select-category"
              label="Category"
              variant="filled"
              value={product.category.name}
              sx={{ marginTop: "20px" }}
            ></TextField>
            <TextField
              id="price"
              label="Price"
              variant="filled"
              sx={{ marginTop: "20px" }}
              value={product.price}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
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
              startIcon={<DeleteIcon />}
              color="error"
              onClick={deletedProduct}
            >
              Delete
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
                Product is not created <br /> because {error}
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
};
