import { Box, Button, ButtonGroup, CardMedia } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import masterCard from "../../assets/img/mastercard.svg";
import security from "../../assets/img/security.svg";
// import user from "../../assets/img/user.jpg";
import userDefaultImg from "../../assets/img/user-default-image.png";
import CustomerMenu from "./CustomerMenu";

const CustomerProfile = () => {
  const [user_id, setUser_id] = useState("");
  const [customer, setCustomer] = useState("");
  const [profilePic, setProfilePic] = useState(userDefaultImg);

  if (customer) {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
      birthDate,
      profilePhotoUrl,
    } = customer;

    const { address_1, address_2, city, state, country, zipcode } =
      customer.address;

    var customerData = (
      <Grid item xs={12} sm={8} lg={5} className="user-profile-spacing">
        <Typography component="h3">{firstName + " " + lastName}</Typography>
        <Typography>
          <Typography component="strong">Email Address: </Typography>
          {email}
        </Typography>
        <Typography>
          <Typography component="strong">Address: </Typography>
          {/* Metro Manila Quezon City, Quezon City, Project 6 */}
          {!Object.keys(customer.address).length
            ? ""
            : address_1 +
              ", " +
              address_2 +
              ", " +
              city +
              ", " +
              state +
              ", " +
              country +
              " - " +
              zipcode}
        </Typography>
        <Typography>
          <Typography component="strong">Birthday: </Typography>
          {new Date(birthDate).toLocaleDateString("fr-CA")}
        </Typography>
        <Typography>
          <Typography component="strong">Gender: </Typography>
          {gender}
        </Typography>
        <Typography>
          <Typography component="strong">Phone Number: </Typography>
          {phoneNumber.replace(/(\+\d{2})\d{9}/, "$1*******")}
        </Typography>
      </Grid>
    );
  }
  const { firstName } = customer || "";
  return (
    <Box className="primary-structure">
      <Container maxWidth="lg">
        <Grid container>
          <CustomerMenu customerName={firstName} />

          <Grid item xs={12} sm={9} md={10}>
            <Box className="primary-structure--content">
              <Box className="content-header">
                <Typography component="h3">My Profile</Typography>
              </Box>
              <Box className="primary-structure--box">
                <Grid container>
                  <Grid item xs={12} sm={4} lg={2}>
                    <Box className="profile-image-box">
                      <img
                        src={profilePic}
                        className="user-image"
                        alt="user"
                        title="user"
                      />
                      {/* <CardMedia
                        className="user-image"
                        alt="user"
                        title="user"
                        image={customer ? customer.profilePhotoUrl : user}
                      /> */}
                      <Typography className="m-l-0 justify-content-start">
                        {/* <img src={security} alt="security" /> */}
                        <CardMedia
                          alt="security"
                          title="security"
                          image={security}
                        />
                        Verified Account
                      </Typography>
                    </Box>
                  </Grid>
                  {customerData}
                  <Grid item xs={12} lg={5}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        onClick={() => {}}
                      >
                        Edit Profile
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        disableElevation
                        fullWidth
                        onClick={() => {}}
                      >
                        Change Password
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>

              <Box className="primary-structure--box payment-method">
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>Payment Methods</Typography>
                    <ul>
                      <li>Credit Card/Debit Card: </li>
                      <li>
                        xxxx - xxxx - xxxx - 5125
                        <img src={masterCard} width="20" alt="Card" />
                        {/* <img src={visa} width="30" alt="Card" />
                        <img src={paypal} width="15" alt="Card" /> */}
                      </li>
                    </ul>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        fullWidth
                        onClick={() => {}}
                      >
                        Manage Payment Methods
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CustomerProfile;
