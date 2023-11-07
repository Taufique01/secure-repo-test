import { Typography } from "@material-ui/core";
import { LoadingButton } from "@mui/lab";
import { Box, Paper } from "@mui/material";
import { useEffect } from "react";
import { useGetClientWithAuth } from "../client/getClientWithAuth";
import { usePostClientWithAuth } from "../client/postClientWithAuth";
import { Status } from "../client/status";

export const SellerPayments = () => {
  const { data: paymentData, reloadData: reloadPaymentData } =
    useGetClientWithAuth(`/api/seller-payments/`);

  const { status: postClientStatus, postData: withDrawRequest } =
    usePostClientWithAuth(`/api/withdraw-request/`);

  useEffect(() => {
    postClientStatus === Status.Success && reloadPaymentData();
  }, [postClientStatus, reloadPaymentData]);

  return (
    <Box display={"flex"}>
      <Paper>
        <Typography>Your Total Sales</Typography>
        <Typography>{paymentData?.totalSales}</Typography>
      </Paper>

      <Paper>
        <Typography>Total Payment Received</Typography>
        <Typography>{paymentData?.totalPaid}</Typography>
      </Paper>

      <Paper>
        <Typography>Total Receivables</Typography>
        <Typography>{paymentData?.totalReceivable}</Typography>
      </Paper>

      {paymentData?.isPendingWithdrawRequest === false ? (
        <LoadingButton
          loading={postClientStatus === Status.Pending}
          onClick={() => withDrawRequest()}
        >
          Withdraw
        </LoadingButton>
      ) : (
        <Typography>There is a pending withdraw request</Typography>
      )}
    </Box>
  );
};
