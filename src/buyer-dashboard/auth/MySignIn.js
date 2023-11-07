import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import Button from "@material-ui/core/Button";
import { Link } from "@material-ui/core";

const MySignIn = () => {
  console.log("in sign in page");
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn(username, password) {}

  return (
    <section className="user-structure">
      <div className="wrapper">
        <p>
          New Member?{" "}
          <Link component={RouterLink} to="/signup">
            Register
          </Link>
          here.
        </p>
        <div className="user-structure--box">
          <h3>Welcome to Hetchly! Please Join.</h3>
          <ValidatorForm
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              handleSignIn(username, password);
            }}
          >
            <div className="form-group">
              <label>Email*</label>
              <TextValidator
                autoComplete="off"
                variant="outlined"
                current
                fullWidth
                required
                placeholder="Please enter your email"
                id="username"
                key="username"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                validators={["required", "isEmail"]}
                errorMessages={[
                  "This field is required",
                  "Please enter a valid email",
                ]}
              />
            </div>
            <div className="form-group">
              <label>Password*</label>
              <TextValidator
                autoComplete="current-password"
                fullWidth
                required
                variant="outlined"
                id="password"
                key="password"
                name="password"
                placeholder="Please enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                validators={["required"]}
                errorMessages={["please enter a valid password"]}
              />
            </div>
            <div className="form-link">
              <Link to="/">Forgot Password?</Link>
            </div>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              type="submit"
            >
              Login
            </Button>
          </ValidatorForm>
        </div>
      </div>
    </section>
  );
};

export default MySignIn;
