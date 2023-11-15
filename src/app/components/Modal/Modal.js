import Grid from "@mui/material/Grid";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

export const Modal = ({ open, onClose, childComponent, title = "" }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      data-testid="modal"
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        padding={3}
        paddingBottom={0}
      >
        <DialogTitle id="customized-dialog-title">{title}</DialogTitle>
        <IconButton edge="end" color="inherit" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Grid container padding={4} paddingTop={0}>
        <Grid item xs={12}>
          {childComponent}
        </Grid>
      </Grid>
    </Dialog>
  );
};
