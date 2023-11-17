import axios from "axios";

export const fetchProduct = async (page) => {
  try {
    const response = await axios.get(`/api/products?page=${page}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

export const addProduct = async ({ productName, productDetails }) => {
  try {
    const response = await axios.post("/api/products", {
      name: productName,
      product_detail: productDetails,
    });
    const createdProduct = response.data;
    return createdProduct;
  } catch (error) {
    console.error("Error submitting product data:", error);
  }
};

export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`/api/products/${id}`, {
      name: data.productName,
      product_detail: data.productDetails,
    });
    const createdProduct = response.data;
    return createdProduct;
  } catch (error) {
    console.error("Error submitting product data:", error);
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`/api/products/${id}`);
    const createdProduct = response.data;
    return createdProduct;
  } catch (error) {
    console.error("Error submitting product data:", error);
  }
};
