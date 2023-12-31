import { Box, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const ProductDelivery = props => {
  return (
    <Box component="div" className="primary-box delivery-info-box">
      <Box className="delivey-box">
        <Typography component="h3">Delivery Options</Typography>
        <List component="ul" aria-label="Delivery Options">
          <Typography component="li">
            <ListItemIcon>
              <LocationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Metro Manila Quezon City, Quezon City, Project 6" />
            <Link component={RouterLink} to="/profile">
              Change
            </Link>
          </Typography>
          <Typography component="li">
            <ListItemIcon>
              <LocalShippingOutlinedIcon />
            </ListItemIcon>
            <Box>
              <ListItemText primary="Standard Delivery" />
              <Typography component="small">{"12-15 Day(s)"}</Typography>
            </Box>
          </Typography>
          <Typography component="li">
            <ListItemIcon>
              <MonetizationOnOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Cash on Delivery Available" />
          </Typography>
        </List>
      </Box>

      <Box className="warranty-box">
        <Typography component="h3">Return &amp; Warranty</Typography>
        <ul>
          <li>
            <CheckOutlinedIcon />
            100% Authentic
          </li>
          <li>
            <CheckOutlinedIcon />
            15 Day Return
            <span>Change of mind is not applicable</span>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default ProductDelivery;
