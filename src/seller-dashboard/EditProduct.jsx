import { Box, Button } from "@material-ui/core";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";
import { useGetClient } from "../client/getClient";
import { ImageUpload } from "./ImagePicker";

export const ProductEditForm = ({ product, saveProduct, onCancel }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const { data: categories } = useGetClient("/api/categories/");
  const [category, setCategory] = useState(
    updatedProduct.categories.map((value) => value.slug)
  );

  return (
    <Box padding={2}>
      <Box>
        <TextField
          variant="standard"
          placeholder="Product name"
          value={updatedProduct.name}
          onChange={(event) => {
            setUpdatedProduct({ ...updatedProduct, name: event.target.value });
          }}
        />
        <TextField
          variant="standard"
          placeholder="Description"
          value={updatedProduct.description}
          onChange={(event) => {
            setUpdatedProduct({
              ...updatedProduct,
              description: event.target.value,
            });
          }}
        />
        <NumericFormat
          customInput={TextField}
          variant="standard"
          placeholder="Price"
          value={updatedProduct.price}
          onChange={(event) => {
            setUpdatedProduct({ ...updatedProduct, price: event.target.value });
          }}
          inputProps={{ inputMode: "decimal" }}
          allowNegative={false}
        />
        <TextField
          variant="standard"
          placeholder="Highlights"
          value={updatedProduct.highlights}
          onChange={(event) => {
            setUpdatedProduct({
              ...updatedProduct,
              highlights: event.target.value,
            });
          }}
        />
        <TextField
          variant="standard"
          placeholder="Specifications"
          value={updatedProduct.specifications}
          onChange={(event) => {
            setUpdatedProduct({
              ...updatedProduct,
              specifications: event.target.value,
            });
          }}
        />
        <TextField
          variant="standard"
          placeholder="Terms and conditions"
          value={updatedProduct.terms}
          onChange={(event) => {
            setUpdatedProduct({ ...updatedProduct, terms: event.target.value });
          }}
        />

        <Select
          id="demo-simple-select"
          multiple
          value={category}
          label="Categories"
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setCategory(typeof value === "string" ? value.split(",") : value);
          }}
        >
          {categories?.map((value) => (
            <MenuItem value={value.slug}>{value.name}</MenuItem>
          ))}
        </Select>
        <NumericFormat
          customInput={TextField}
          placeholder="Quantity available"
          variant="standard"
          value={product.quantityAvailable}
          onChange={(event) => {
            setUpdatedProduct({
              ...updatedProduct,
              quantityAvailable: event.target.value,
            });
          }}
          inputProps={{ inputMode: "decimal" }}
          allowNegative={false}
        />
      </Box>
      <Box>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            saveProduct({ ...updatedProduct, categories: category })
          }
        >
          Save Product
        </Button>
      </Box>
    </Box>
  );
};
