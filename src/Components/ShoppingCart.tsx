import { useState } from "react";
import CartItem from "./CartItem";
import { useCartContextState } from "../Context/CartContext";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const ShoppingCart = () => {
  //Getting Context
  const { state, dispatch, REDUCER_ACTIONS, CartTotalPrice } =
    useCartContextState();
  const { theme } = useProductDisplayContext();
  //Submit State
  const [isSubmit, setIsSubmit] = useState(false);
  //Submit Logic
  const handleSubmit = () => {
    dispatch({ type: REDUCER_ACTIONS.clear, payload: state.cart[0] });
    setIsSubmit(true);
  };
  //Main HTML Return
  const content = (
    <main className="shopping-cart">
      {isSubmit ? (
        <p>Thank you for your order!</p>
      ) : state.cart.length === 0 ? (
        <p>The cart is empty...</p>
      ) : (
        state.cart.map((prod) => <CartItem prod={prod} />)
      )}
      <p>Total: {CartTotalPrice}$</p>
      <button
        className={theme === "dark" ? "btn-dark" : "btn-light"}
        onClick={() => handleSubmit()}
      >
        Submit Order
      </button>
    </main>
  );
  return content;
};

export default ShoppingCart;
