import { ButtonGroup, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

const NavButtonGroup = styled(ButtonGroup)(({ theme }) => ({
  boxShadow: "none",
}));

// const BreweryCard = styled(Card)(({ theme }) => ({
//   width: "40%",
//   padding: "1em",
//   margin: "1em",
//   raised: true,
//   backgroundColor: "#3f51b5",
// }));

export { NavButtonGroup };
