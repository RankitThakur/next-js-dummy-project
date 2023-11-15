import React from "react";
import { Button, Box, Grid, TextField } from "@mui/material";
import { AddProduct } from "../../config/axios/axiosApi";

export const ProductForm = ({ onClose, reloadProductList }) => {
  const [productName, setProductName] = React.useState("");
  const [productDetails, setProductDetails] = React.useState("");

  const handleSubmit = async () => {
    try {
      const res = await AddProduct({ productName, productDetails });
      if (res) {
        onClose();
        setProductName("");
        setProductDetails("");
        reloadProductList();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: "2px" }}>
        <Grid item xs={12}>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            label="Product Details"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={productDetails}
            onChange={(e) => setProductDetails(e.target.value)}
          />
        </Grid>
        <Grid container justifyContent="flex-end" alignItems="flex-end">
          <Box mt={2}>
            <Button
              type="button"
              variant="contained"
              color="primary"
              size="medium"
              sx={{ marginRight: "20px" }}
              onClick={handleSubmit}
            >
              Add Product
            </Button>
            <Button
              type="button"
              variant="outlined"
              size="medium"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
