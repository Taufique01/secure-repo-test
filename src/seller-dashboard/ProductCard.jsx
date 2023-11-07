import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { CardActions } from "@mui/material";
import { UpdateProductImage } from "./UpdateProductImage";
import { useDeleteClient } from "./useDeleteClient";
import { Status } from "../client/status";

export function ProductCard(props) {
  const [openImageEditForm, setOpenImageEditForm] = useState(false);
  const { status: deleteStatus, trigger: deleteProduct } = useDeleteClient();

  useEffect(() => {
    console.log(deleteStatus);
    deleteStatus === Status.Success && props.reloadProducts();
  });

  return (
    <>
      <UpdateProductImage
        product={props.product}
        open={openImageEditForm}
        onClose={() => setOpenImageEditForm(false)}
        onUpdate={props.reloadProducts}
      />
      <Card className="product-card">
        <CardActionArea onClick={() => setOpenImageEditForm(true)}>
          <CardMedia
            component="img"
            src={
              props.product.images.length !== 0
                ? props.product.images[0].image
                : "/default/image"
            }
            alt="Product Image"
          />
        </CardActionArea>

        <CardContent>
          <Typography component="h4">{props.product.name}</Typography>
          <Typography component="h5">BDT {props.product.price}</Typography>
          <Typography className="product-rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
            (55)
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="small" onClick={() => props.setOpenEditForm(true)}>
            Edit
          </Button>
          <Button
            onClick={() =>
              deleteProduct({ input: `/api/products/${props.product.id}/` })
            }
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
