"use client";
import { Mulish } from "next/font/google";
import { Box, Button } from "@mui/material";
import { Modal } from "../../components/Modal/Modal";
import React, { useEffect, useState } from "react";
import { ProductForm } from "../../components/ProductForm/ProductForm";
import ProductList from "../../components/ProductList/ProductList";
const mulish = Mulish({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadProductList, setReloadProductList] = useState(false);

  const handleReloadProductList = () => {
    setReloadProductList(!reloadProductList);
  };
  return (
    <>
      <Box sx={{ marginTop: 4 }}>
        <Button
          className={mulish.className}
          onClick={() => setIsModalOpen(true)}
          variant="contained"
          color="primary"
        >
          Create Product
        </Button>
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          childComponent={
            <ProductForm
              onClose={() => setIsModalOpen(false)}
              reloadProductList={() => setReloadProductList(!reloadProductList)}
            />
          }
        />
        <ProductList key={reloadProductList} />
      </Box>
    </>
  );
};
export default HomePage;
