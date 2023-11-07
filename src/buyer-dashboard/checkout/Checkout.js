import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
import React, { useEffect, useState } from "react";
import {
  AccountCircle,
  Email,
  LocationOn,
  PhoneAndroidOutlined,
} from "@material-ui/icons";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import { StatusCode, usePostClient } from "../../client/postClient";
import { Status } from "../../client/status";

const Checkout = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [road, setRoad] = useState("");
  const [upzilla, setUpzilla] = useState("");
  const [district, setDistrict] = useState("");
  const [post, setPost] = useState("");

  const { items, totalItems, cartTotal, emptyCart } = useCart();
  const {
    status,
    postData: createOrder,
    responseData: newOrder,
  } = usePostClient("/api/order/", StatusCode.Created, true);
  const navigate = useNavigate();

  const placeOrder = () => {
    const orderData = {
      orderDetails: items,
      customerName,
      customerPhone,
      customerEmail,
      road,
      upzilla,
      district,
      post,
    };
    createOrder(orderData);
  };

  useEffect(() => {
    if (status === Status.Success && newOrder !== undefined) {
      emptyCart();
      navigate("/order-confirm", { state: newOrder });
    }
  }, [emptyCart, navigate, newOrder, status]);

  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Box className="checkout-page">
          <Typography component="h4">Checkout ({totalItems}) items</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Box className="primary-structure--box">
                <Typography className="font-bold">Shipping Details</Typography>

                <Box className="shipping-info">
                  <Box className="shipping-info--row">
                    <Box className="wrap">
                      <AccountCircle />
                      <Box className="shipping-info--content">
                        <TextField
                          placeholder="Full Name"
                          value={customerName}
                          onChange={(event) =>
                            setCustomerName(event.target.value)
                          }
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="shipping-info--row">
                    <Box className="wrap">
                      <LocationOn />
                      <Box className="shipping-info--content">
                        <TextField
                          placeholder="Road/Village"
                          value={road}
                          onChange={(event) => setRoad(event.target.value)}
                        />
                        <TextField
                          placeholder="Upzilla"
                          value={upzilla}
                          onChange={(event) => setUpzilla(event.target.value)}
                        />
                        <TextField
                          placeholder="Post"
                          value={post}
                          onChange={(event) => setPost(event.target.value)}
                        />
                        <TextField
                          placeholder="District"
                          value={district}
                          onChange={(event) => setDistrict(event.target.value)}
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="shipping-info--row">
                    <Box className="wrap">
                      <PhoneAndroidOutlined />
                      <Box className="shipping-info--content">
                        <TextField
                          placeholder="Phone"
                          value={customerPhone}
                          onChange={(event) =>
                            setCustomerPhone(event.target.value)
                          }
                        />
                      </Box>
                    </Box>
                  </Box>

                  <Box className="shipping-info--row">
                    <Box className="wrap">
                      <Email />
                      <Box className="shipping-info--content">
                        <TextField
                          placeholder="Email"
                          value={customerEmail}
                          onChange={(event) =>
                            setCustomerEmail(event.target.value)
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>

                <Box className="review-order">
                  <Typography className="font-bold">Review Order</Typography>
                  Order review
                </Box>
                <Box className="standard-delivery-info">
                  <DirectionsBikeOutlinedIcon></DirectionsBikeOutlinedIcon>
                  <Typography>
                    <strong>Standard Delivery:</strong> Estimated delivery time
                    5 days
                  </Typography>
                </Box>

                <Box className="order-summary">
                  <Typography className="font-bold">Order Summary</Typography>
                  <ul>
                    <li>
                      <Typography>Subtotal ({totalItems} items)</Typography>
                      <Typography>{numberWithCommas(cartTotal)}</Typography>
                    </li>
                    <li>
                      <Typography>Shipping Fee</Typography>
                      <Typography>{calculateShippingCost(items)}</Typography>
                    </li>
                    <li>
                      <Typography component="strong">Total</Typography>
                      <Typography component="strong">
                        {numberWithCommas(
                          cartTotal + calculateShippingCost(items)
                        )}
                      </Typography>
                    </li>
                  </ul>
                </Box>
                <Box>
                  <Typography>
                    Only Cash on delivery is available now. Pay to the delivery
                    man the amount to receive the product.
                  </Typography>
                </Box>
                <Button
                  className="m-t-20"
                  variant="contained"
                  color="primary"
                  disableElevation
                  fullWidth
                  onClick={placeOrder}
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Checkout;

const numberWithCommas = (x) => {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateShippingCost = (items) => {
  return 100;
};
