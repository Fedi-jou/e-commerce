import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Products from "./components/products/Products";
import { commerce } from "./lib/commerce";
import { useState, useEffect } from "react";
import Cart from "./components/cart/Cart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Checkout from "./components/checkoutform/checkout/Checkout";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const Fetchproducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  const Fetchcart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };
  const HandleAddtocart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
  };

  const handleupdatequantity = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity });
    setCart(response.cart);
  };
  const handleremovefromcart = async (productId) => {
    const response = await commerce.cart.remove(productId);
    setCart(response.cart);
  };

  const handleemptycart = async () => {
    const response = await commerce.cart.empty();
    setCart(response.cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );

      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  };

  useEffect(() => {
    Fetchproducts();
    Fetchcart();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar cart={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onaddtocart={HandleAddtocart} />
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart}
              handleupdatequantity={handleupdatequantity}
              handleremovefromcart={handleremovefromcart}
              handleemptycart={handleemptycart}
            />
          </Route>
          <Route path="/checkout">
            <Checkout
              cart={cart}
              order={order}
              handleCaptureCheckout={handleCaptureCheckout}
              error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
