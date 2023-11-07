import { Box, ButtonGroup, CardMedia } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import NumberField from "../../ui/NumberField";
import { useCart } from "react-use-cart";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
  },
  cardMedia: {
    borderRadius: "10px",
    paddingTop: "56.25%", // 16:9
  },
  grid: {
    padding: "1em",
  },
  checkoutForm: {
    display: "flex",
    flexDirection: "column",
    paddingLeft: "16px",
  },
  checkoutButtons: {
    display: "flex",
  },
  iconsRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  linkRowItem: {
    marginRight: "0.5em",
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const ProductSummary = ({ product, userId }) => {
  const classes = useStyles();
  const [quantity, setQuantity] = useState(1);
  const { addItem, items } = useCart();

  const [productBaseImage, setProductBaseImage] = useState(
    product.images.length > 0 ? product.images[0].image : ""
  );

  const [ratingValue, setRatingValue] = React.useState(2);

  const addToCart = () => {
    addItem(product, quantity);
  };

  const handleImageChange = (e, image) => {
    setProductBaseImage(image);
  };

  useEffect(() => {
    console.log("items", items);
  }, [items]);

  return (
    <Box component="div" className="primary-box product-gallery" px={3} py={5}>
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Box className="product-slides">
            <CardMedia
              className={classes.cardMedia}
              image={productBaseImage}
              title="Image title"
            />
            <Slider {...productSlider}>
              {product.images.length !== 0 &&
                product.images.map((value, index) => (
                  <Card key={`image-${index}`}>
                    <CardActionArea>
                      <CardMedia
                        onClick={(e) => handleImageChange(e, value.image)}
                        image={value.image}
                        title={`image-${index}`}
                      />
                    </CardActionArea>
                  </Card>
                ))}
            </Slider>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="h3">{product.name}</Typography>
          <Typography component="h4">BDT {product.price}</Typography>

          <Box component="div" className="share-wishlist">
            <Typography className="product-rating">
              <Rating
                name="half-rating-read"
                precision={0.5}
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
              ({ratingValue})
            </Typography>
          </Box>
          <List component="ul" className="have-questions">
            <ListItem>
              <ListItemLink href="#">
                <ListItemText primary={ratingValue + " Ratings"} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemLink href="#">
                <ListItemText primary={ratingValue + " Reviews"} />
              </ListItemLink>
            </ListItem>
            <ListItem>
              <ListItemLink href="#">
                <ListItemText primary="Have Questions?" />
              </ListItemLink>
            </ListItem>
          </List>
          {/* 
      <Box className="color-family">
        <Typography>Color Family: Blue</Typography>

        <ul className="color-palette">
          <li>White</li>
          <li>Space Grey</li>
          <li>Black</li>
        </ul>
        <List component="ul" className="color-palette">
          <ListItem>
            <ListItemLink href="#">
              <ListItemText
                primary="Blue"
                style={{ backgroundColor: "blue" }}
              />
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#">
              <ListItemText
                primary="Space Grey"
                style={{ backgroundColor: "grey" }}
              />
            </ListItemLink>
          </ListItem>
          <ListItem>
            <ListItemLink href="#">
              <ListItemText
                primary="Black"
                style={{ backgroundColor: "Black" }}
              />
            </ListItemLink>
          </ListItem>
        </List>
      </Box> */}

          {/* <Typography className="strorage-capacity">
        Size
        <FormControl className="width-auto">
          <Select
            value={storageCapacity}
            onChange={(e) => setStorageCapacity(e.target.value)}
            variant="outlined"
            displayEmpty
            IconComponent={() => <ExpandMoreIcon />}
          >
            <MenuItem value="64">64GB</MenuItem>
            <MenuItem value="128">128GB</MenuItem>
          </Select>
        </FormControl>
      </Typography> */}

          <Typography className="product-quantity">
            Quantity:
            <Box className="quantity">
              <NumberField
                onChange={setQuantity}
                value={quantity}
                minValue={1}
                style={{ marginRight: "10px", marginTop: "8px" }}
              />
            </Box>
          </Typography>

          <ButtonGroup>
            <Button
              variant="contained"
              disableElevation
              color="primary"
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductSummary;

var productSlider = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  arrows: false,
  slidesToScroll: 1,
  initialSlide: 0,
  prevArrow: (
    <Box component="div">
      <ArrowBackIos />
    </Box>
  ),
  nextArrow: (
    <Box component="div">
      <ArrowForwardIos />
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
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};
