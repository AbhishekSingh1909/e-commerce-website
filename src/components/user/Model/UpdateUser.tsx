import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import {
  Controller,
  DefaultValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelIcon from "@mui/icons-material/Cancel";

import { User } from "../../../types/User";
import { UpdateUser, UpdateUserDto } from "../../../types/UpdateUser";
import { useAppDispatch } from "../../../app/hooks/useAppDispatch";
import { updateUserAsync } from "../../../redux/users/updateUserAsync";
import { resetUser } from "../../../redux/users/userReducer";

export const UpdateUserByAdmin = ({ updateUser }: { updateUser: User }) => {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(updateUser.role.toString());

  const defaultValues: DefaultValues<FormValues> = {
    name: updateUser.name,
    email: updateUser.email,
    password: updateUser.password,
    confirm: updateUser.password,
    avatar: updateUser.avatar,
    role: updateUser.role,
  };

  const formSchema = yup.object({
    name: yup.string().max(30).required("Required"),
    email: yup
      .string()
      .email("Email is not correct")
      .max(255)
      .required("Required"),
    password: yup
      .string()
      .min(8)
      .max(20)
      .required("Please create a stronger password"),
    confirm: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Required"),
    avatar: yup.string().nullable(),
    role: yup.string().required(),
  });

  const dispatch = useAppDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
    resolver: yupResolver(formSchema),
  });

  const onFormSubmit: SubmitHandler<FormValues> = async (data, event) => {
    event?.preventDefault();
    const updateUserDto: UpdateUserDto = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      avatar:
        data.avatar ?? "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    const user: UpdateUser = {
      id: updateUser.id,
      updateUser: updateUserDto,
    };
    const result = await dispatch(updateUserAsync(user));
    if (result.meta.requestStatus === "fulfilled") {
      toast.success("User updated successfully");
    } else if (result.meta.requestStatus === "rejected") {
      toast.error("Error while updating User");
      reset(defaultValues);
    }
    setOpen(false);
    dispatch(resetUser());
  };
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
  };
  return (
    <Fragment>
      <ToastContainer />

      <Container maxWidth="xs">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleClickOpen}
        >
          Edit
        </Button>

        <Dialog open={open} fullWidth>
          {updateUser && (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              {updateUser.name}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit(onFormSubmit)}
            sx={{ mt: 1 }}
          >
            <DialogTitle>Edit Profile</DialogTitle>
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
            {errors.name && (
              <Typography color="red">{errors.name.message}</Typography>
            )}
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
            <Controller
              //defaultValue={updateUser.password}
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

            <Controller
              render={({ field }) => (
                <TextField
                  required
                  fullWidth
                  select
                  defaultValue={updateUser.role}
                  value={role}
                  onChange={handleRoleChange}
                  margin="normal"
                  label="role"
                >
                  <MenuItem key={"admin"} value={"admin"}>
                    {"admin"}
                  </MenuItem>
                  <MenuItem key={"customer"} value={"customer"}>
                    {"customer"}
                  </MenuItem>
                </TextField>
              )}
              name="role"
              control={control}
            />

            <DialogActions
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                gap: "10px",
              }}
            >
              <Box>
                <Button
                  variant="contained"
                  endIcon={<CancelIcon />}
                  onClick={handleClose}
                  color="error"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                  onClick={() => {
                    reset(defaultValues);
                  }}
                >
                  Reset
                </Button>
                <Button
                  variant="contained"
                  sx={{ mt: 3, mb: 2, marginLeft: "20px" }}
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </DialogActions>
          </Box>
        </Dialog>
      </Container>
    </Fragment>
  );
};

export default UpdateUserByAdmin;

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
  avatar?: string | undefined | null;
  role: string;
}
