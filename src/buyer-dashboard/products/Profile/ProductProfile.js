import { Box, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router";

import ProductDelivery from "./ProductDelivery";
import ProductDetails from "./ProductDetails";
import ProductSummary from "./ProductSummary";
import QuestionAnswer from "./QuestionAnswer";
import RatingReview from "./RatingReview";
import { useGetClient } from "../../../client/getClient";

const ProductProfile = () => {
  const classes = [];
  const { id } = useParams();
  const { data: product } = useGetClient(
    `/api/products/product-details/${id}/`
  );

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        className="tab-content"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  }

  const [tabValue, setTabValue] = React.useState(0);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const LoadingCard = (
    <Box className={classes.container}>
      <Card className={classes.container}>
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Card>
    </Box>
  );

  return (
    <Box component="div" className="main-content">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} lg={9}>
            {product ? (
              <ProductSummary userId={1} product={product} />
            ) : (
              LoadingCard
            )}
          </Grid>
          <Grid item xs={12} lg={3}>
            {product ? (
              <ProductDelivery productSupplier={product.supplier} />
            ) : (
              LoadingCard
            )}
          </Grid>
        </Grid>

        <Box component="div" className="primary-box horizontal-tabs">
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
          >
            <Tab label="Item Details" {...a11yProps(0)} />
            <Tab label="Rating &amp; Reviews" {...a11yProps(1)} />
            <Tab label="Question &amp; Answer" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            {product ? (
              <ProductDetails product={product} />
            ) : (
              <CircularProgress />
            )}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <RatingReview />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            <QuestionAnswer />
          </TabPanel>
        </Box>

        {/* <Box component="div" className="products-box">
          <Typography component="h3">From the same store</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box>

        <Box component="div" className="products-box">
          <Typography component="h3">Similar items</Typography>
          <Slider {...productListSlider}>{productList}</Slider>
        </Box> */}
      </Container>
    </Box>
  );
};

export default ProductProfile;
