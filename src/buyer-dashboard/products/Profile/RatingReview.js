import {
  Box,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import CustomerRatings from "./CustomerRatings";

const ProductDelivery = (props) => {
  const [filteredValue, setFilteredValue] = React.useState("");
  const [tabValue, setTabValue] = React.useState(0);

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} sm={4}>
          <Paper elevation={0} className="rating-box">
            <Fragment>
              <Typography component="h4">
                <Typography component="strong">5</Typography>
                /5
              </Typography>
              <Typography className="product-rating">
                <Rating
                  name="half-rating-read"
                  defaultValue={2.5}
                  precision={0.5}
                  readOnly
                />
              </Typography>
            </Fragment>
            <Typography>{"38 Ratings & 5 Reviews"}</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box component="div" className="content-box">
        <Box component="div" className="content-box--header">
          <Typography component="h3">Customer Reviews</Typography>
        </Box>

        <CustomerRatings />

        <CustomerRatings />
      </Box>
    </Fragment>
  );
};

export default ProductDelivery;
