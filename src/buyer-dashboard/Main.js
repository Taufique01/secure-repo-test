import React from "react";
import {
  Route,
  Router,
  Link as RouterLink,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import {
  ShoppingCartOutlined as ShoppingCartIcon,
  PersonOutlined as SignInIcon,
} from "@material-ui/icons";

import Cart from "./carts/Cart";
import CheckEmail from "./auth/CheckEmail";
import Checkout from "./checkout/Checkout";
import CustomerBillings from "./customers/CustomerBillings";
import CustomerProfile from "./customers/CustomerProfile";
import CustomerEditForm from "./customers/CustomerEditForm";
import ChangePassword from "./customers/ChangePassword";
import PaymentMethod from "./customers/PaymentMethod";
import OrderConfirm from "./OrderConfirm";
import OrderList from "./customers/orders/OrderList";

import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Landing from "./Landing";
import Link from "@material-ui/core/Link";
import MySignIn from "./auth/MySignIn";
import MySignUp from "./auth/MySignUp";
import UserSignUp from "./auth/UserSignUp";
import Aboutus from "./Aboutus";
import ProductProfile from "./products/Profile/ProductProfile";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useUser } from "./utilities/user";
import Products from "./products/Products";
import { CartProvider } from "react-use-cart";
import { RequireAuth } from "./utilities/PrivateRoute";
import { LoginForm } from "../authentication/LoginForm";
import { TrackOrder } from "./TrackOrder";
import SellerProducts from "../seller-dashboard/SellerProducts";
import { Orders } from "../seller-dashboard/Orders";
import { SellerDashboard } from "../seller-dashboard/SellerDashboard";
import { SellerPayments } from "../seller-dashboard/SellerPayments";

const useStyles = makeStyles((theme) => ({
  navLink: {
    margin: theme.spacing(2),
    fontSize: "1rem",
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  authLinks: {
    position: "relative",

    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%",
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function BuyerRoutes() {
  return (
    <Routes>
      <Route path="products" element={<Products />} />
      <Route path="signin" element={<LoginForm />} />

      <Route path="/about-us" element={<Aboutus />} />

      <Route path="cart" element={<Cart />} />
      <Route path="signup" element={<MySignUp />} />

      <Route path="user-signup" element={<UserSignUp />} />

      <Route path="check-email" element={<CheckEmail />} />
      <Route path="order-confirm" element={<OrderConfirm />} />
      <Route path="track-order/:orderId" element={<TrackOrder />} />
      <Route
        path="checkout"
        element={
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        }
      />

      <Route path="/product/:id" element={<ProductProfile />} />
      {/* <Route path="/seller-dashboard/products" element={<Products />} />
      <Route path="/seller-dashboard" element={<SellerDashboard />} /> */}
    </Routes>
  );
}

function Main() {
  const sections = [
    { title: "Sell on Hetchly", url: "#" },
    { title: "Track my order", url: "#" },
    { title: "Help Center", url: "#" },
  ];

  const navbarLinks = [
    { title: "Cart", url: "cart", icon: <ShoppingCartIcon /> },
    { title: "Login", url: "signin", icon: <SignInIcon /> },
  ];

  return (
    <>
      <CartProvider>
        <Header title="Blog" sections={sections} navbarLinks={navbarLinks} />
        <Routes>
          <Route
            path="seller-dashboard/*"
            element={<SellerDashboardRoutes />}
          />
          <Route path="*" element={<BuyerRoutes />} />
        </Routes>

        {/*  */}

        {/* <PrivateRoute path="/profile" element={CustomerProfile} />
          <PrivateRoute path="/edit-profile" element={CustomerEditForm} />
          <PrivateRoute path="/change-password" element={ChangePassword} />
          <PrivateRoute path="/payment-method" element={PaymentMethod} />
          <PrivateRoute path="/orders-list" element={OrderList} />
          <PrivateRoute path="/billings" element={CustomerBillings} /> */}
      </CartProvider>
      <Footer />
    </>
  );
}

const SellerDashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="products"
        element={
          <RequireAuth>
            <SellerProducts />
          </RequireAuth>
        }
      />

      <Route
        path="orders"
        element={
          <RequireAuth>
            <Orders />
          </RequireAuth>
        }
      />

      <Route
        path="payments"
        element={
          <RequireAuth>
            <SellerPayments />
          </RequireAuth>
        }
      />

      <Route path="" element={<SellerDashboard />} />
    </Routes>
  );
};

export default Main;
