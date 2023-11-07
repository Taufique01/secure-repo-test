import { Box, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import MediaQuery from "react-responsive";
import { Link as RouterLink } from "react-router-dom";
import Slider from "react-slick";
import { useGetClient } from "../client/getClient";
// import "slick-carousel/slick/slick-theme.css";
// import "slick-carousel/slick/slick.css";
import { PRODUCT_API_URL } from "../config/apiUrl";
import { Categories } from "./Categories";
import FooterTop from "./layouts/FooterTop";

export default function Landing() {
  const { data: products } = useGetClient("/api/products/all");

  var bannerList = products?.map((product) => {
    return (
      <Card key={product.id} className="product-card">
        <CardMedia
          image={product.imageUrl} /* change to product.imageUrl */
          title="Image title"
        />

        <CardContent>
          <Typography component="h2">{product.description}</Typography>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="button"
            >
              Shop Now
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    );
  });

  var productList = products?.map((product) => {
    const imgIndex = product.baseImage && product.baseImage.split("-")[1];
    const baseImageURL = imgIndex
      ? product.imageUrls[imgIndex]
      : product.imageUrl;
    return (
      <Card key={product.id} className="product-card">
        <CardActionArea
          component={RouterLink}
          to={"/product/" + product.id}
        >
          <CardMedia
            image={baseImageURL} /* change to product.imageUrl */
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
    );
  });

  var productListSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: (
      <Box component="div">
        <ArrowBackIosIcon />
      </Box>
    ),
    nextArrow: (
      <Box component="div">
        <ArrowForwardIosIcon />
      </Box>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var banner = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: true,
    prevArrow: (
      <Box component="div">
        <ArrowBackIosIcon />
      </Box>
    ),
    nextArrow: (
      <Box component="div">
        <ArrowForwardIosIcon />
      </Box>
    ),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <MediaQuery minWidth={1024}>
            <Categories></Categories>
          </MediaQuery>
          <Grid container item xs={12} md={9} spacing={0}>
            <Box component="div" className="main-banner">
              <Slider {...banner}>{bannerList}</Slider>
            </Box>
          </Grid>
        </Grid>

        <Box component="div" className="products-box">
          <Typography component="h3">Trending</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box>

        <Box component="div" className="products-box">
          <Typography component="h3">Best Seller</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box>

        <Button
          variant="contained"
          color="primary"
          disableElevation
          type="button"
          onClick={() => window.location.replace("/products/all")}
        >
          See All Products
        </Button>

        <FooterTop />
      </Container>
    </Box>
  );
}

export function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}
