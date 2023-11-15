"use client";
import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { fetchProduct } from "../../config/axios/axiosApi";
import Image from "next/image";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ProductList = ({ key }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProduct();
        setProducts(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchData();
  }, [key]);

  const handleEdit = (productId) => {
    console.log(`Edit product with ID ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product with ID ${productId}`);
  };

  return (
    <>
      <h1>ProductList</h1>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          marginLeft: "40px",
        }}
      >
        {products.map((product, index) => (
          <Card
            key={index}
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
              <IconButton onClick={() => handleEdit(product.id)}>
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(product.id)}
                sx={{ marginLeft: 1 }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
            <Image
              src="./about.svg"
              width={100}
              alt="test"
              height={100}
            ></Image>
            <CardContent>
              <Typography variant="p" component="div">
                Product Name: {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Product Detail: {product.product_detail}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ProductList;
