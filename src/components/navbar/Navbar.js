import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import Logo from "../../assets/logo.jpg";
import useStyles from "./Styles";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
function Navbar({ cart }) {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className="classes.title"
            color="inherit"
            style={{ textDecorationLine: "none" }}
          >
            <img
              src={Logo}
              alt="online shop"
              height="20px"
              className={classes.image}
            />
            Online shop
          </Typography>
          <div className={classes.grow} />
          {location.pathname === "/" && (
            <div className={classes.button}>
              <IconButton
                component={Link}
                to="/cart"
                aria-label=""
                color="inherit"
              >
                <Badge badgeContent={cart} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
