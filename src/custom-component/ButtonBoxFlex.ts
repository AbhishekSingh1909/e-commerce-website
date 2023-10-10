import { Box, styled } from "@mui/material";

const ButtonBoxFlex = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  color: "CaptionText",
  // backgroundColor: "#dedede",
}));

export default ButtonBoxFlex;
