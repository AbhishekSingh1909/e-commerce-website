import { Fragment, useEffect } from "react";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { getAllUsersAsync } from "../redux/users/getAllUsersAsync";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CardContent,
  CircularProgress,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";

export const UsersList = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { users, error, loading } = useAppSelector(
    (state) => state.userReducer
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        dispatch(getAllUsersAsync());
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user]);
  return (
    <Fragment>
      <Container maxWidth="xs">
        <CssBaseline />
        <Typography variant="h4"> Users</Typography>
        {loading && (
          <Box>
            <CircularProgress />
          </Box>
        )}
        {error && <Typography> {`There is a error : ${error}`}</Typography>}
        {users?.length > 0 &&
          users?.map((user) => (
            <Box
              key={user.id}
              sx={{
                width: "100%",
                hight: "50%",
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
                <Typography>Name: {user?.name}</Typography>
                <Typography>Email: {user?.email}</Typography>
                <Typography>Role: {user?.role}</Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button>Edit</Button>
                  <Button>Delete</Button>
                </Box>
              </CardContent>
            </Box>
          ))}
      </Container>
    </Fragment>
  );
};
