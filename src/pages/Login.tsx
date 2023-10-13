import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  TextField,
  Typography,
  Link,
  Container,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Button from "@mui/material/Button";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { purple } from "@mui/material/colors";
import { Navigate, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { LoginCredential } from "../types/User";
import { userLogInAsync } from "../redux/userAuthentication/userLogInAsync";
import { useAppSelector } from "../app/hooks/useAppSelector";
import Footer from "../components/Footer";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [showMsg, setshowMsg] = useState(false);
  const { user, error, loading } = useAppSelector((state) => state.authReducer);

  useEffect(() => {
    if (error) {
      console.log("error show", error);
      setShowError(true);
    }
    // if (!error && user) {
    //   setShowError(false);
    // }
  }, [error]);

  // useEffect(() => {
  //   if (user) {
  //     setshowMsg(true);
  //   }
  // });

  // useEffect(() => {
  //   console.log("erorro 1", error);
  //   console.log("show error1", showError);
  //   setShowError(false);
  // }, []);

  const handleErroClose = () => {
    console.log("show error handleCloseError", showError);
    setShowError(false);
    //console.log("show error handleCloseError latest", showError);
  };
  const handleMsgClose = () => {
    console.log("setshowMsg handleCloseError", showError);
    setshowMsg(false);
    //console.log("show error handleCloseError latest", showError);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email") as string | null;
    const password = data.get("password") as string | null;
    console.log("show error handleSubmit", showError);
    // if (error) {
    //   setShowError(true);
    // }

    if (email && password) {
      dispatch(userLogInAsync({ email, password }));
    }
  };

  const userSinUp = () => {
    console.log("register go");
    navigate("/register", { replace: true });
  };
  return (
    <Fragment>
      <Container maxWidth="xs">
        {user && <Navigate to="/" replace={true} />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ bgcolor: purple[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">SignIn</Typography>
          <Typography variant="h6">
            Please enter you email and password
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Enter your email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              id="outlined-password-input"
              margin="normal"
              required
              fullWidth
              label="Enter your password"
              type="password"
              name="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Don't have an account ?</Typography>
              <Link component="button" variant="body2" onClick={userSinUp}>
                Sign Up
              </Link>
            </Grid>
          </Box>
        </Box>
      </Container>
      {/* {error && ( */}
      <Snackbar
        open={showError}
        autoHideDuration={5000}
        onClose={handleErroClose}
      >
        <Alert severity="error">user credential is not valid ,{error}</Alert>
      </Snackbar>
      {/* //)} */}
      {/* {user && (
        <Snackbar
          open={showMsg}
          autoHideDuration={5000}
          onClose={handleMsgClose}
        >
          <Alert severity="success">
            user credential is not valid ,{error}
          </Alert>
        </Snackbar>
      )} */}
      <Footer />
    </Fragment>
  );
};

export default Login;
