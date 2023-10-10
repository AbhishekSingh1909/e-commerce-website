import { BottomNavigation, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <BottomNavigation>
      <Typography>
        Copyright ©
        <Button component={Link} to="/">
          Abhishek Singh
        </Button>
        2023
      </Typography>
    </BottomNavigation>
  );
};
export default Footer;
