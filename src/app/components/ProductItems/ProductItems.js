"use client";
import React, { useEffect, useState } from "react";
import { Box, Pagination } from "@mui/material";
import { fetchProduct, deleteProduct } from "../../config/axios/axiosApi";
import { Modal } from "../../components/Modal/Modal";
import { ProductForm } from "../ProductForm/ProductForm";
import { ProductCard } from "../ProductCard/ProductCard";

const ProductItems = ({ getData }) => {
  const [products, setProducts] = useState([]);
  const [editProducts, setEditProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadProductList, setReloadProductList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page) => {
    try {
      const response = await fetchProduct(page);
      setProducts(response.data);
      const { totalPages, currentPage } = response.metadata;
      setCurrentPage(currentPage);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [getData, reloadProductList]);

  const handleDelete = async (productId) => {
    const res = await deleteProduct(productId);
    if (res) {
      setReloadProductList(!reloadProductList);
    }
  };

  const handleEdit = (product) => {
    setIsModalOpen(true);
    setEditProducts(product);
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
        {products?.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            onEdit={() => handleEdit(product)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </Box>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        childComponent={
          <ProductForm
            onClose={() => setIsModalOpen(false)}
            reloadProductList={() => setReloadProductList(!reloadProductList)}
            isEdit={true}
            value={editProducts}
          />
        }
      />
      <Pagination
        color="primary"
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => fetchData(page)}
      />
    </>
  );
};

export default ProductItems;
