import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Divider,
  InputLabel,
  Stack,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAppSelector } from "../app/hooks/useAppSelector";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { UpdateProfileModel } from "../components/user/Model/UpdateProfile";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { getSingleUsersAsync } from "../redux/users/getSingleUserAsync";

export const Profile = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { users, singleUser, error, loading } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    if (!user) {
      navigate("login", { replace: true });
    }
  }, [user]);

  const currentUser = useMemo(() => {
    if (users.length > 0) {
      console.log("current user : single user ", singleUser);
      const findUser = users.find((u) => u.id === user?.id);
      if (findUser) {
        return findUser;
      }
    } else {
      console.log("current user : login user ", user);
      return user;
    }
  }, [singleUser, user]);

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <Card sx={{ maxWidth: 345, margin: "20px" }}>
        <CardMedia
          component="img"
          alt={user?.name}
          height="194"
          image={currentUser?.avatar}
        />
        <CardContent>
          {currentUser && (
            <Typography gutterBottom variant="h5" component="div">
              Name : {currentUser.name}
            </Typography>
          )}

          {currentUser && (
            <Typography variant="h6" color="text.secondary">
              Email : {currentUser.email}
            </Typography>
          )}

          {currentUser && (
            <Typography variant="h6" color="text.secondary">
              Password : {currentUser.password}
            </Typography>
          )}

          {currentUser && (
            <Typography variant="h6" color="text.secondary">
              Role : {currentUser.role}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined" startIcon={<DeleteIcon />}>
              Delete
            </Button>
            {currentUser && <UpdateProfileModel updateUser={currentUser} />}
          </Stack>
        </CardActions>
      </Card>
    </Container>
  );
};
