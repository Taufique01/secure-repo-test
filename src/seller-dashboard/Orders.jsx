import {
  Box,
  Button,
  Dialog,
  DialogActions,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import * as React from "react";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DialogTitle } from "@material-ui/core";
import { useGetClientWithAuth } from "../client/getClientWithAuth";
import { usePostClientWithAuth } from "../client/postClientWithAuth";
import { LoadingButton } from "@mui/lab";
import { Status } from "../client/status";

export const Orders = () => {
  const { data, reloadData: reloadOrders } =
    useGetClientWithAuth(`/api/orders/`);
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    if (data === undefined) return;
    setOrders(data);
  }, [data]);

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return (
              <OrderTableBody
                order={order}
                id={order.id}
                onStatusChange={reloadOrders}
              />
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const OrderTableBody = ({ order, id, onStatusChange }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{order.orderId}</TableCell>
        <TableCell>{order.productName}</TableCell>
        <TableCell>{order.quantity}</TableCell>
        <TableCell>{order.price}</TableCell>
        <TableCell>{order.status}</TableCell>
        <TableCell>
          <StatusChange
            status={order.status}
            orderId={id}
            onStatusChange={onStatusChange}
          />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Customer Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>email</TableCell>
                    <TableCell>Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {order.customerName}
                    </TableCell>
                    <TableCell> {order.customerPhone}</TableCell>
                    <TableCell> {order.customerEmail}</TableCell>
                    <TableCell> {order.customerAddress}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const StatusChange = ({ status, orderId, onStatusChange }) => {
  const [open, setOpen] = React.useState(false);

  const { status: clientStatus, postData } = usePostClientWithAuth(
    `/api/seller-order/${orderId}/shift-status/`
  );

  const changeStatus = () => {
    setOpen(true);
  };

  React.useEffect(() => {
    if (clientStatus === Status.Success) {
      setOpen(false);
      onStatusChange();
    }
  }, [clientStatus, onStatusChange]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Advance to next step from {status}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>
            Cancel
          </Button>
          <LoadingButton
            loading={clientStatus === Status.Pending}
            onClick={() => postData()}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Button onClick={changeStatus}>Complete step</Button>
    </React.Fragment>
  );
};
