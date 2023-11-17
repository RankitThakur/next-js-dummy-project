import React from "react";
import { Button, Box, Grid, TextField, Typography } from "@mui/material";
import { addProduct, updateProduct } from "../../config/axios/axiosApi";

export const ProductForm = ({ onClose, reloadProductList, isEdit, value }) => {
  const [productName, setProductName] = React.useState(
    isEdit ? value.name : ""
  );
  const [productDetails, setProductDetails] = React.useState(
    isEdit ? value.product_detail : ""
  );

  console.log(value);
  const handleSubmit = async () => {
    try {
      const res = await addProduct({ productName, productDetails });
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

  const handleUpdate = async () => {
    const data = { productName, productDetails };
    const id = value.id;
    const res = await updateProduct(id, data);
    if (res) {
      onClose();
      reloadProductList();
    }
  };

  return (
    <>
      <Typography> {isEdit ? "Edit" : "ADD"}</Typography>
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
              onClick={isEdit ? handleUpdate : handleSubmit}
            >
              {isEdit ? "Edit Product" : "Add Product"}
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
