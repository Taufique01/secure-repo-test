import {
  Box,
  Button,
  Container,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  LocationOn,
} from "@material-ui/icons";

import { useGetClient } from "../client/getClient";
import { Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { TrackingDetails } from "./TrackingDetails";

export const TrackOrder = () => {
  const { orderId } = useParams();
  const { data: order } = useGetClient(`/api/order/${orderId}/`);

  return (
    <Box>
      {order === undefined ? (
        <TrackSkeleton />
      ) : (
        <TrackingDetails order={order} />
      )}
    </Box>
  );
};

export const numberWithCommas = (x) => {
  return x
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const calculateShippingCost = (items) => {
  return 100;
};

const TrackSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
      <Skeleton variant="rectangular" width={"100%"} height={200} />
    </Box>
  );
};


