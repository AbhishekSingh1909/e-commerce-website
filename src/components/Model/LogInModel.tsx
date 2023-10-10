import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  TextField,
} from "@mui/material";
import React from "react";

export const LogIn = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button
        onClick={handleClickOpen}
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
