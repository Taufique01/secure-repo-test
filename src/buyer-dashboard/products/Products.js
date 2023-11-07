import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Link as RouterLink,
  Switch,
} from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import { useGetClient } from "../../client/getClient";
import { useLocation, useParams } from "react-router-dom";

export default function Products() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category") == null ? "" : query.get("category");
  const { sellerId } = useParams();

  const { data: products } = useGetClient(
    `/api/products/${sellerId}?category=${category}`
  );

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid item xs={12} md={9} spacing={0}>
            <Box component="div" className="all-products">
              <Grid container spacing={0}>
                {products?.map((product) => {
                  return (
                    <Grid
                      key={product.id}
                      item
                      xs={12}
                      sm={4}
                      md={3}
                      spacing={0}
                    >
                      <Card className="product-card">
                        <CardActionArea
                          component={RouterLink}
                          to={"/product/" + product.id}
                        >
                          <CardMedia
                            image={product.imageUrl}
                            title="Image title"
                          />
                        </CardActionArea>

                        <CardContent>
                          <Typography component="h4">{product.name}</Typography>
                          <Typography component="h5">
                            {product.currency} {product.price}
                          </Typography>
                          <Typography className="description">
                            {product.description}
                          </Typography>
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
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>

              {/* <Button
                variant='outlined'
                color='primary'
                disableElevation
                type='button'
              >
                Load More
              </Button> */}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
