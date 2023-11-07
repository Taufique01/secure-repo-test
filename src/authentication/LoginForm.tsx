import { redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Status, useLoginPost } from "./authClient";
import { Alert, Box, Button, Grid, TextField } from "@mui/material";
import { useAuthentication } from "../auth-provider/AuthProvider";
import { Typography } from "@material-ui/core";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { token, status, setLogin } = useLoginPost();
  const isEmailAndPassValid = email && password;
  const { setToken } = useAuthentication();
  const navigate = useNavigate();

  const handleEmailChange = (emailFromInput: string) => {
    setEmail(emailFromInput);
  };

  const handlePasswordChange = (passwordFromInput: string) => {
    setPassword(passwordFromInput);
  };

  useEffect(() => {
    console.log("here", status);
    status === Status.Success && navigate("/checkout");
  }, [navigate, status]);

  useEffect(() => {
    token && setToken(token);
  }, [token, setToken]);

  const handleSubmit = () => {
    isEmailAndPassValid && setLogin({ email: email, password: password });
  };

  const onKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Box maxWidth={"600px"}>
      <Box>
        {status === Status.Error && (
          <Alert severity="error">Request failed.</Alert>
        )}
        {status === Status.AuthError && (
          <Alert severity="error">Incorrect email or password.</Alert>
        )}
      </Box>
      <Box>
        <TextField
          fullWidth
          label={"Email"}
          placeholder={"Email"}
          variant={"standard"}
          type={"email"}
          onChange={(event) => {
            handleEmailChange(event.target.value);
          }}
          onKeyPress={onKeyPress}
        />
      </Box>

      <Box>
        <TextField
          fullWidth
          variant={"standard"}
          placeholder="Password"
          label={"Password"}
          type="password"
          onChange={(event) => {
            handlePasswordChange(event.target.value);
          }}
          onKeyPress={onKeyPress}
        />
      </Box>

      <Grid container justifyContent={"center"}>
        <Grid item xs={12} md={6}>
          <Button
            onClick={handleSubmit}
            aria-label="login-button"
            data-testid="test-id-login-button"
            variant={"contained"}
            disabled={!isEmailAndPassValid}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Box>
        <p>
          <Typography
            onClick={() => {
              window.open("reset-password/", "_self");
            }}
          >
            Forgot Password?
          </Typography>
        </p>
      </Box>

      <Box>
        <div>
          Don't have an Account?
          <Box
            onClick={() => {
              window.open("signup/", "_self");
            }}
          >
            Sign Up
          </Box>
        </div>
      </Box>
    </Box>
  );
};
