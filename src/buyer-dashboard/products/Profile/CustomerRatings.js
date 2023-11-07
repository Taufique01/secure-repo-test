import { Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import React from "react";

const CustomerRatings = props => {
  return (
    <Box component="div" className="content-box--body">
      <Grid container className="review-row">
        <Grid item xs={12} sm={8} md={9} lg={10}>
          <Typography className="product-rating">
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Typography>
          <Typography className="review-date">
            by shubham pandey on Oct 24, 2016
          </Typography>
          <Typography className="review-desc">
            Lorem ipsum dummy text.
          </Typography>
          <Typography className="review-helpful">
            5 People Found this review helpful. Was this review helpful?
   
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerRatings;
