import { Box } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <Box>
      <Box className="primary-accordian" style={{ marginBottom: "24px" }}>
        <Accordion>
          <AccordionSummary expandIcon={<AddBoxOutlinedIcon />}>
            <Typography variant="subtitle1">Highlights</Typography>
          </AccordionSummary>
          <AccordionDetails>hello{product.highlights}</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<AddBoxOutlinedIcon />}>
            <Typography variant="subtitle1">Description</Typography>
          </AccordionSummary>
          <AccordionDetails>{product.description}</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<AddBoxOutlinedIcon />}>
            <Typography variant="subtitle1">Specifications</Typography>
          </AccordionSummary>
          <AccordionDetails>{product.specifications}</AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary expandIcon={<AddBoxOutlinedIcon />}>
            <Typography variant="subtitle1">Terms and Conditions</Typography>
          </AccordionSummary>
          <AccordionDetails>{product.terms}</AccordionDetails>
        </Accordion>
      </Box>

      {/* <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ marginRight: "8px" }}>
          Was this information helpful to you?
        </Typography>
        <Button variant="outlined" style={{ marginRight: "8px" }}>
          Yes
        </Button>
        <Button variant="outlined" style={{ marginRight: "8px" }}>
          No
        </Button>
      </Box> */}
    </Box>
  );
};

export default ProductDetails;
