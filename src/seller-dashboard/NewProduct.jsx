import { Box, Button } from "@material-ui/core";
import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { usePostClientWithAuth } from "../client/postClientWithAuth";
import { Status } from "../client/status";
import { ProductEditForm } from "./EditProduct";

const sampleProduct = {
  id: -1,
  name: "",
  categories: [],
  price: 0,
  quantityAvailable: 0,
  description: "",
  images: [],
  highlights: "",
  specifications: "",
  terms: "",
};

export const NewProduct = ({ onProductAddSuccess }) => {
  const { postData: addProduct, status } =
    usePostClientWithAuth(`/api/products/`);

  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    if (status === Status.Success) {
      setOpenEditForm(false);
      onProductAddSuccess();
    }
  }, [onProductAddSuccess, status]);

  return (
    <Box>
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <ProductEditForm
          product={sampleProduct}
          saveProduct={(newProduct) => {
            addProduct(newProduct);
          }}
          onCancel={() => setOpenEditForm(false)}
        />
      </Dialog>
      <Button onClick={() => setOpenEditForm(true)}>Add Product</Button>
    </Box>
  );
};
