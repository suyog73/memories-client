import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@material-ui/core";
import Icon from "./icon";
import GoogleLogin from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import InputComponent from "./InputComponent";

import useStyles from "./styles";

const Auth = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggling
  };

  const handleSubmit = (e) => {};

  const handleChange = (e) => {};
  const switchMode = (e) => {
    setIsSignup((prevSignup) => !prevSignup);
  };

  const googleSuccess = async (res) => {
    // console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google sign in was unsuceesful. Try again Later");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Log In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <InputComponent
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoComplete="username"
                  autoFocus
                  half
                />
                <InputComponent
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  autoComplete="username"
                  half
                />
              </>
            )}
            <InputComponent
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
              autoComplete="email"
            />
            <InputComponent
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              autoComplete="current-password"
            />
            {isSignup && (
              <InputComponent
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                autoComplete="current-password"
              />
            )}
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            {isSignup ? "Sign Up" : "Log In"}
          </Button>

          <GoogleLogin
            clientId="369519216905-uvadv4l3skoj83jl9a3cbmv8fkqhl6qv.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
