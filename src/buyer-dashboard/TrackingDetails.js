import { Box, Grid, Typography } from "@material-ui/core";
import DirectionsBikeOutlinedIcon from "@material-ui/icons/DirectionsBikeOutlined";
import React from "react";
import {
  AccountCircle,
  Email, PhoneAndroidOutlined
} from "@material-ui/icons";
import { numberWithCommas } from "./TrackOrder";
import { orderTotal } from "./orderTotal";
import { itemsTotal } from "./itemsTotal";
import { OrderStatusStepper } from "./OrderStatusStepper";

export const TrackingDetails = ({ order }) => {
  return (
    <Box>
      <Grid>
        {order.orderDetails.map((value) => {
          return (
            <React.Fragment key={value.id}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography>{value.productName}</Typography>
                <Typography>{value.price}</Typography>
                <Typography>{value.quantity}</Typography>
                <Typography>{value.price * value.quantity}</Typography>
              </Box>

              <OrderStatusStepper orderDetail={value}></OrderStatusStepper>
            </React.Fragment>
          );
        })}
      </Grid>
      <Grid item xs={12} md={12}>
        <Box className="primary-structure--box">
          <Typography className="font-bold">Shipping Details</Typography>
          <Box>
            <AccountCircle />
            <Typography>{order.name}</Typography>
          </Box>

          <Box>
            <DirectionsBikeOutlinedIcon />
            <Typography>{order.address}</Typography>
          </Box>

          <Box>
            <PhoneAndroidOutlined />
            <Typography>{order.phone}</Typography>
          </Box>

          <Box className="wrap">
            <Email />
            <Typography>{order.email}</Typography>
          </Box>

          <Box className="review-order">
            <Typography className="font-bold">Review Order</Typography>
            Order review
          </Box>

          <Box className="order-summary">
            <Typography className="font-bold">Order Summary</Typography>
            <ul>
              <li>
                <Typography>Subtotal ({itemsTotal(order)} items)</Typography>
                <Typography>{numberWithCommas(orderTotal(order))}</Typography>
              </li>
              <li>
                <Typography>Shipping Fee</Typography>
                <Typography>{order.shippingFee}</Typography>
              </li>
              <li>
                <Typography component="strong">Total</Typography>
                <Typography component="strong">
                  {numberWithCommas(orderTotal(order) + order.shippingFee)}
                </Typography>
              </li>
            </ul>
          </Box>
          <Box>
            <Typography>Cash on delivery payment.</Typography>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
