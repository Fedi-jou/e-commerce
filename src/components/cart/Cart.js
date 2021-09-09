import React from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import useStyles from "./Styles";
import Cartitem from "./cartitem/Cartitem";
import { Link } from "react-router-dom";

function Cart({
  cart,
  handleupdatequantity,
  handleremovefromcart,
  handleemptycart,
}) {
  const classes = useStyles();
  if (!cart.line_items) return "Loading";
  const Emptycart = () => (
    <>
      <Typography subtitle1>
        You have no items in your shopping cart ,{" "}
        <Link to="/" className={classes.link}>
          {" "}
          start adding ..
        </Link>
      </Typography>
    </>
  );
  const Filledcart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <Cartitem
              item={item}
              handleupdatequantity={handleupdatequantity}
              handleremovefromcart={handleremovefromcart}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Total Price: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleemptycart}
          >
            Empty cart
          </Button>
          <Button
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
            component={Link}
            to="/checkout"
          >
            Checkout
          </Button>
        </div>
      </div>
    </>
  );

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your shopping cart
      </Typography>
      {!cart.line_items.length ? <Emptycart /> : <Filledcart />}
    </Container>
  );
}

export default Cart;
