import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/cart/cartReducer";

interface State extends SnackbarOrigin {
  open: boolean;
}

export const CheckOut = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const [clear, setClear] = React.useState(false);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const dispatch = useDispatch();
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
    setClear(true);
    dispatch(clearCart());
  };
  // React.useEffect(() => {
  //   if (clear) {
  //     if (user) {
  //       console.log("clear cart");
  //       localStorage.removeItem(JSON.stringify(user.id));
  //     }
  //   }
  // }, [clear]);

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Button
        size="medium"
        variant="contained"
        onClick={handleClick({ vertical: "top", horizontal: "center" })}
      >
        CheckOut
      </Button>
    </React.Fragment>
  );

  return (
    <Box>
      {buttons}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Dear customer, we are pleased to inform you that your order has been placed and will arrive at its destination soon."
        autoHideDuration={5000}
        key={vertical + horizontal}
      />
    </Box>
  );
};
