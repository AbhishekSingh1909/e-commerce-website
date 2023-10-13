import Avatar from "@mui/material/Avatar";
import { NavButtonGroup } from "../styles/component.style";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import { useAppDispatch } from "../app/hooks/useAppDispatch";
import { useAppSelector } from "../app/hooks/useAppSelector";
import { AuthType, logOut } from "../redux/userAuthentication/authReducer";
import { useEffect, useMemo, useState } from "react";
import { StyledBadge } from "../custom-component/StyledCartButton";
import { CartItem } from "../types/CartItem";
import { clearCart } from "../redux/cart/cartReducer";

const Header = () => {
  const { user } = useAppSelector((state) => state.authReducer);
  const { cartItems } = useAppSelector((state) => state.cartReducer);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setMenu] = useState(false);
  const [items, setItems] = useState<CartItem[]>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const items = useMemo(() => {
  //   if (user && cartItems?.length > 0) {
  //     const userId = JSON.stringify(user.id);

  //     const cartItems = localStorage.getItem(userId);
  //     if (cartItems) {
  //       return JSON.parse(cartItems);
  //     }
  //   }
  // }, [user, cartItems]);

  // useEffect(() => {
  //   if (user && cartItems?.length > 0) {
  //     const userId = JSON.stringify(user.id);

  //     const cartItems = localStorage.getItem(userId);
  //     if (cartItems) {
  //       setItems(JSON.parse(cartItems));
  //     }
  //   }
  // }, [user, cartItems]);
  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(clearCart());
    setMenu(false);
    setAnchorEl(null);
    navigate("/", { replace: true });
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenu(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setMenu(false);
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("profile", { replace: true });
  };
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQAX_Gxm2hcuAMAe5jLxV8Sr8XrUv6nRGE2saeLtQ6cKkz4IYPQnnoTDGM2A&s"
          sx={{ width: 60, height: 60 }}
        ></Avatar>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: "rgb(255, 236, 180)",
            fontFamily: "Courgette,cursive",
            marginLeft: "10px",
            width: "40%",
          }}
        >
          Go Shopping
        </Typography>

        <Container>
          <NavButtonGroup variant="contained">
            <Button component={Link} to="/">
              Home
            </Button>
            <Button component={Link} to="/products">
              Products
            </Button>
            {user && user.role === "admin" && (
              <Button component={Link} to="/users">
                Users
              </Button>
            )}
          </NavButtonGroup>
        </Container>
        <IconButton aria-label="cart" component={Link} to="AddToCart">
          <StyledBadge badgeContent={calculateTotal()} color="secondary">
            <ShoppingCartIcon color="warning" />
          </StyledBadge>
        </IconButton>
        {!user && (
          <Button
            component={Link}
            to="login"
            sx={{
              marginLeft: "auto",
              borderRadius: "10px",
              width: "20%",
              paddingLeft: "0%",
            }}
          >
            <Avatar
              variant="circular"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "50%",
              }}
            >
              Login
            </Avatar>
          </Button>
        )}
        {user && (
          <Stack direction="row" spacing={2}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt="Remy Sharp" src={user?.avatar} />
              <Typography variant="h6" sx={{ color: "rgb(255, 236, 180)" }}>
                {user.name}
              </Typography>
            </IconButton>
            {openMenu && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
              </Menu>
            )}
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Header;
