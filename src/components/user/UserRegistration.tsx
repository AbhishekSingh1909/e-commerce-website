import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { purple } from "@mui/material/colors";
import { Fragment, useEffect, useState } from "react";
import { CreateNewUser } from "../../types/CreateNewUser";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks/useAppDispatch";
import { createUsersAsync } from "../../redux/users/createUserAsync";
import Footer from "../Footer";
import FormBoxFlex from "../../custom-component/FormBoxFlex";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormValues, defaultValues, formSchema } from "../../types/FormValues";
import ButtonBoxFlex from "../../custom-component/ButtonBoxFlex";
import { useAppSelector } from "../../app/hooks/useAppSelector";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetUser } from "../../redux/users/userReducer";

const UserRegister = () => {
  const [confirmPassword, setconfirmPassword] = useState("");
  const [newUser, setNewUser] = useState<CreateNewUser>({
    email: "",
    name: "",
    password: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, error, loading, singleUser } = useAppSelector(
    (state) => state.userReducer
  );

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit: SubmitHandler<FormValues> = async (data) => {
    const user: CreateNewUser = {
      name: data.name,
      email: data.email,
      password: data.password,
      avatar:
        data.avatar ?? "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };
    const result = await dispatch(createUsersAsync(user));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success(`Welcome ${user.name}`);
      setTimeout(() => {
        userSignIn();
      }, 1000);
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Opps! User registration has failed");
    }
  };
  const userSignIn = () => {
    navigate("../login", { replace: true });
  };

  // useEffect(() => {
  //   console.log("clear");
  //   dispatch(resetUser());
  // }, []);
  // useEffect(() => {
  //   if (error) {
  //     toast.error("Can't Register , because" + error, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  //   if (singleUser) {
  //     toast.success("Welcome " + singleUser.name, {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setTimeout(() => {
  //       userSignIn();
  //     }, 1000);

  //     dispatch(resetUser());
  //   }
  // }, [error, singleUser]);

  return (
    <Fragment>
      <Container maxWidth="xs">
        <ToastContainer />
        {/* {singleUser && <Navigate to="../login" replace={true} />} */}
        <CssBaseline />

        <FormBoxFlex>
          <Avatar sx={{ bgcolor: purple[500] }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h6">Register</Typography>
          <Typography variant="h6">Please enter user detail</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your name"
                  {...field}
                />
              )}
              name="name"
              control={control}
            />
            {/* <TextField
              required
              fullWidth
              margin="normal"
              id="name"
              label="Enter your name"
              autoFocus
              {...register("name")}
            /> */}
            {errors.name && (
              <Typography color="red">{errors.name.message}</Typography>
            )}
            {/* <TextField
              required
              fullWidth
              margin="normal"
              id="email"
              label="Enter your email"
              {...register("email")}
            /> */}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your email"
                  {...field}
                />
              )}
              name="email"
              control={control}
            />
            {errors.email && (
              <Typography color="red">{errors.email.message}</Typography>
            )}
            {/* <TextField
              required
              fullWidth
              margin="normal"
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            /> */}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter your password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
              name="password"
              control={control}
            />
            {errors.password && (
              <Typography color="red">{errors.password.message}</Typography>
            )}
            {/* <TextField
              required
              fullWidth
              margin="normal"
              id="confirm"
              label="confirm password"
              type="password"
              {...register("confirm")}
            /> */}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Confirm your password"
                  type="password"
                  autoComplete="current-password"
                  {...field}
                />
              )}
              name="confirm"
              control={control}
            />
            {errors.confirm && (
              <Typography color="red">{errors.confirm.message}</Typography>
            )}
            {/* <TextField
              required
              fullWidth
              margin="normal"
              id="image"
              label="Image Url"
              {...register("image")}
            /> */}
            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  margin="normal"
                  label="Enter Image Url"
                  {...field}
                />
              )}
              name="avatar"
              control={control}
            />
            {errors.avatar && (
              <Typography color="red">{errors.avatar.message}</Typography>
            )}

            <ButtonBoxFlex>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  reset(defaultValues);
                }}
              >
                Reset
              </Button>
              <Button variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">
                Register
              </Button>
            </ButtonBoxFlex>

            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">Already have an account ?</Typography>
              <Link component="button" variant="body2" onClick={userSignIn}>
                SignIn
              </Link>
            </Grid>
          </Box>
        </FormBoxFlex>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default UserRegister;
