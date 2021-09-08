import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

function Paymentform({
  checkouttoken,
  Backstep,
  handleCaptureCheckout,
  nextstep,
  shippingdata,
}) {
  const Handlesubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkouttoken.live.line_items,
        customer: {
          firstname: shippingdata.firstName,
          lastname: shippingdata.lastName,
          email: shippingdata.email,
        },
        shipping: {
          name: "International",
          street: shippingdata.address1,
          town_city: shippingdata.city,
          county_state: shippingdata.shippingSubdivision,
          postal_zip_code: shippingdata.zip,
          country: shippingdata.shippingCountry,
        },
        fulfillment: { shipping_method: shippingdata.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      handleCaptureCheckout(checkouttoken.id, orderData);
      nextstep();
    }
  };
  return (
    <>
      <Review checkouttoken={checkouttoken} />
      <Divider />
      <Typography variant="h6" butterbottom style={{ margin: "20px 0" }}>
        Payment method{" "}
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => Handlesubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="outlined" onClick={Backstep}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  Pay {checkouttoken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
}

export default Paymentform;
