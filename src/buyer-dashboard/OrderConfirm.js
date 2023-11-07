import React from "react";
import { Divider } from "@material-ui/core";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink, useLocation } from "react-router-dom";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const OrderConfirmComponent = () => {
  const { state: order } = useLocation();

  return (
    <div>
      <Container maxWidth="md" spacing={1}>
        <Card>
          <CardContent>
            <Grid container direction="row" alignItems="center">
              <Grid item sm={5}>
                <Box mx="2em">
                  <CheckCircleOutlineIcon></CheckCircleOutlineIcon>

                  <Typography variant="h6" align="center">
                    Payment Confirmed
                  </Typography>

                  <span>Order Number: {order.orderId}</span>
                </Box>
              </Grid>

              <Grid item sm={1}>
                <Divider orientation="vertical"></Divider>
              </Grid>

              <Grid item sm={5}>
                <Box mx="2em">
                  <Typography variant="h6">
                    Delivery Dates: : <span>July 4 -5</span>
                  </Typography>
                  <p>
                    For more details, track your delivery status from the link
                    sent to your {`email ${order.email} and`} phone{" "}
                    {order.phone}
                  </p>
                  <Button
                    className="m-t-20"
                    variant="contained"
                    color="primary"
                    disableElevation
                    fullWidth
                    type="submit"
                    component={RouterLink}
                    to={order.orderId}
                  >
                    Track your order
                  </Button>
                </Box>
              </Grid>

              <Grid item sm={12}>
                <Box my="2.5em">
                  <Typography variant="h6" align="center">
                    <Link component={RouterLink} to="/">
                      Continue Shopping
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default OrderConfirmComponent;
