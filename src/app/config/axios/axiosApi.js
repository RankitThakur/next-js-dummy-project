import axios from "axios";

export const fetchProduct = async () => {
  try {
    const response = await axios.get("/api/products");
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
};

export const AddProduct = async ({ productName, productDetails }) => {
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
