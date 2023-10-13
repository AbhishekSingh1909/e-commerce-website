import { Alert, Box, Collapse, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

import { useAppSelector } from "../../app/hooks/useAppSelector";

export const ProductStatus = ({
  messagesToShow,
}: {
  messagesToShow: string[];
}) => {
  const [openAlert, setOpenAlert] = React.useState(true);
  const { products, error, loading } = useAppSelector(
    (state) => state.productReducer
  );

  const onCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <main>
      <Box>
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Collapse in={openAlert}>
              <Alert
                severity="error"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      onCloseAlert();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {messagesToShow[0]} {error}
              </Alert>
            </Collapse>
          </Stack>
        )}
        {!error && !loading && products && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Collapse in={openAlert}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      onCloseAlert();
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {messagesToShow[1]}
              </Alert>
            </Collapse>
          </Stack>
        )}
      </Box>
    </main>
  );
};
