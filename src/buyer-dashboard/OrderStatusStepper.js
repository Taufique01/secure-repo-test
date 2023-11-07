import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { OrderSteps } from "./OrderSteps";


export function OrderStatusStepper({ orderDetail }) {
  return (
    <Stepper activeStep={OrderSteps[orderDetail.status]} alternativeLabel>
      <Step key={"pending"}>
        <StepLabel>Pending confirmation</StepLabel>
      </Step>

      <Step key={"confirmed"}>
        <StepLabel>Order is confirmed</StepLabel>
      </Step>

      <Step key={"Processing"}>
        <StepLabel>Order is Processing</StepLabel>
      </Step>

      <Step key={"shipped"}>
        <StepLabel>shipped</StepLabel>
      </Step>

      <Step key={"delivered"}>
        <StepLabel>Delivered</StepLabel>
      </Step>
    </Stepper>
  );
}
