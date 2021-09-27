import React, { useEffect, useState, useCallback } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  // console.log(user);
  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  }, [dispatch, history, setUser]);

  useEffect(() => {
    const token = user?.token;
    //JWT
    if (token) {
      const decodeToken = decode(token);

      if (decodeToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Link to="/">
          <img src={memoriesText} alt="icon" height="45px" />
          <img
            className={classes.image}
            src={memoriesLogo}
            alt="icon"
            height="40px"
          />
        </Link>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} varient="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logout}
              color="secondary">
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
