import { Box, Button, IconButton } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useCart } from "react-use-cart";

import FooterTop from "../layouts/FooterTop";
import NumberField from "../ui/NumberField";

const Cart = () => {
  const { isEmpty, totalItems, cartTotal, items } = useCart();

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} lg={8}>
            {isEmpty ? <EmptyCart /> : <CartItems />}
          </Grid>
          <Grid item xs={12} lg={4}>
            <Box
              component="div"
              className="primary-box delivery-info-box checkout-info"
            >
              <Box className="delivey-box">
                <Typography component="h3">Location</Typography>
                <ul>
                  <li>
                    <LocationOnOutlinedIcon />a customer address
                  </li>
                </ul>
              </Box>

              <Box className="warranty-box">
                <Typography component="h3">Order Summary</Typography>
                <ul className="order-summary">
                  <li>
                    <Typography component="span">
                      Subtotal ({totalItems} items)
                    </Typography>
                    <Typography component="span">
                      {numberWithCommas(cartTotal)}
                    </Typography>
                  </li>
                  <li>
                    <Typography component="span">Shipping Fee</Typography>
                    <Typography component="span">
                      {calculateShippingCost(items)}
                    </Typography>
                  </li>
                </ul>
              </Box>

              <Typography className="order-total">
                <Typography>Total</Typography>
                <Typography component="strong">
                  {numberWithCommas(cartTotal + calculateShippingCost(items))}
                </Typography>
              </Typography>

              <Button
                component={RouterLink}
                to="/checkout"
                variant="contained"
                color="primary"
                disableElevation
                fullWidth
              >
                Proceed to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
        <FooterTop />
      </Container>
    </Box>
  );
};

export default Cart;

const EmptyCart = () => {
  return (
    <Box component="div" className="primary-box cart-product-card">
      <Box className="product-box">
        <CardContent>
          <Box className="product-info-content">
            <Typography component="h3">Your shopping cart is empty</Typography>
          </Box>
        </CardContent>
        <CardContent>
          <Box>
            <Typography component="h4">
              You may add items to your shopping cart here.
            </Typography>
          </Box>
        </CardContent>
        <Box component="div" className="quantity">
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            disableElevation
            fullWidth
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

const CartItems = () => {
  const { items, removeItem, updateItemQuantity } = useCart();
  return (
    <>
      {items.map((product, index) => (
        <Box
          component="div"
          className="primary-box cart-product-card"
          key={product.id}
        >
          <Box className="product-box">
            <Box className="product-checkbox">
              <CardMedia
                title="Image title"
                image={product.images.length > 0 ? product.images[0].image : ""}
              />
            </Box>
            <CardContent>
              <Box className="product-info-content">
                <Typography component="h3">
                  <Link component={RouterLink} to={"/products/" + product.id}>
                    {product.name}
                  </Link>
                </Typography>
                <Typography>{product.description}</Typography>
                <Typography component="h4">By a seller</Typography>
              </Box>
              <Box className="product-box-action">
                <Typography component="h5">
                  BDT {numberWithCommas(product.itemTotal)}
                </Typography>
                <Box component="div" className="icon-group">
                  <IconButton onClick={() => removeItem(product.id)}>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box component="div" className="quantity">
                <Box className="number-field">
                  <NumberField
                    onChange={(value) => updateItemQuantity(product.id, value)}
                    value={product.quantity}
                    minValue={1}
                  />
                </Box>
              </Box>
            </CardContent>
          </Box>
        </Box>
      ))}
    </>
  );
};

const numberWithCommas = (x) => {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateShippingCost = (items) => {
  return 100;
};
