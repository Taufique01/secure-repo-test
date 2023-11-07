import React from "react";

import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@material-ui/core";

const PaymentForm = ({ amount, currency, order }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Typography>
        Only Cash on delivery is available now. Pay to the delivery man the
        amount to receive the product.
      </Typography>

      <Button variant="contained">Confirm Order</Button>
    </Box>
  );
};

export default PaymentForm;
