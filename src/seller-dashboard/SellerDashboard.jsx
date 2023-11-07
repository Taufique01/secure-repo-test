import { Box, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const SellerDashboard = () => {
  return (
    <Box>
      <Link to="/seller-dashboard/products">
        <Typography>Products</Typography>
      </Link>
    </Box>
  );
};
