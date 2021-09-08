import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CssBaseline,
} from "@material-ui/core";
import useStyles from "./Styles";
import Paymentform from "../Paymentform";
import Adressform from "../Adressform";
import { commerce } from "../../../lib/commerce";
const steps = ["Shipping adresss", "Payment details"];
function Checkout({ cart, order, handleCaptureCheckout, error }) {
  const classes = useStyles();
  const [activestep, setActivestep] = useState(0);
  const [checkouttoken, setCheckouttoken] = useState(null);
  const [shippingdata, setShippingdata] = useState({});
  const history = useHistory();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });

        setCheckouttoken(token);
      } catch (error) {
        history.push("/");
      }
    };
    generateToken();
    // eslint-disable-next-line
  }, [cart]);
  const nextstep = () => {
    setActivestep((prevactivestep) => prevactivestep + 1);
  };
  const Backstep = () => {
    setActivestep((prevactivestep) => prevactivestep - 1);
  };
  const next = (data) => {
    setShippingdata(data);
    nextstep();
  };

  const Confirmation = () => <div>Confirmation</div>;

  const Form = () =>
    activestep === 0 ? (
      <Adressform checkouttoken={checkouttoken} next={next} />
    ) : (
      <Paymentform
        shippingdata={shippingdata}
        checkouttoken={checkouttoken}
        Backstep={Backstep}
        handleCaptureCheckout={handleCaptureCheckout}
        nextstep={nextstep}
      />
    );

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activestep} className={classes.stepper}>
            {steps.map((step) => (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activestep === steps.length ? (
            <Confirmation />
          ) : (
            checkouttoken && <Form />
          )}
        </Paper>
      </main>
    </>
  );
}

export default Checkout;
