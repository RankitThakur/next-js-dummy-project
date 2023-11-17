import React from "react";
import { Card, CardContent, Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        width: 250,
        margin: "10px",
        whiteSpace: "normal",
        position: "relative",
        "&:hover .edit-delete-icons": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          justifyContent: "end",
          opacity: 0,
          transition: "opacity 0.3s",
        }}
        className="edit-delete-icons"
      >
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={onDelete} sx={{ marginLeft: 1 }}>
          <DeleteIcon />
        </IconButton>
      </Box>
      <Image src="./about.svg" width={100} alt="test" height={100}></Image>
      <CardContent>
        <Typography variant="p" component="div">
          Product Name: {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Product Detail: {product.product_detail}
        </Typography>
      </CardContent>
    </Card>
  );
};
