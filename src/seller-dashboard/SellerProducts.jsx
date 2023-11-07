import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { Dialog } from "@mui/material";
import { useGetClient } from "../client/getClient";
import { ProductEditForm } from "./EditProduct";
import { usePostClientWithAuth } from "../client/postClientWithAuth";
import { Status } from "../client/status";
import { NewProduct } from "./NewProduct";
import UploadImageIcon from "./ImageUploadIcon.png";
import { RemoveCircleOutline } from "@material-ui/icons";
import { RemoveCircle } from "@mui/icons-material";
import { ProductCard } from "./ProductCard";
import { useGetClientWithAuth } from "../client/getClientWithAuth";

export default function SellerProducts() {
  const { data: products, reloadData: reloadProducts } =
    useGetClientWithAuth(`/api/products/`);
  const { postData: updateProduct, status } =
    usePostClientWithAuth(`/api/products/`);

  const [openEditForm, setOpenEditForm] = useState(false);

  useEffect(() => {
    if (status === Status.Success) {
      reloadProducts();
      setOpenEditForm(false);
    }
  }, [reloadProducts, status]);

  return (
    <Box component="div" className="main-content">
      <NewProduct onProductAddSuccess={reloadProducts} />
      <Container maxWidth="lg">
        {products?.map((product) => {
          return (
            <Grid key={product.id} item xs={12} sm={4} md={3}>
              <ProductCard
                setOpenEditForm={setOpenEditForm}
                product={product}
                reloadProducts={reloadProducts}
              ></ProductCard>
              <Dialog
                open={openEditForm}
                onClose={() => setOpenEditForm(false)}
              >
                <ProductEditForm
                  product={product}
                  saveProduct={(editedProduct) => {
                    updateProduct(editedProduct);
                  }}
                  onCancel={() => setOpenEditForm(false)}
                />
              </Dialog>
            </Grid>
          );
        })}
      </Container>
    </Box>
  );
}
