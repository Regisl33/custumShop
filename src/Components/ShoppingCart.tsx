import { useState } from "react";
import { useCartContextState } from "../Context/CartContext";
import CartItem from "./CartItem";
import { Themes } from "../App";

type PropsType = {
  theme: Themes;
};

const ShoppingCart = ({ theme }: PropsType) => {
  const { state, dispatch, REDUCER_ACTIONS, CartTotalPrice } =
    useCartContextState();

  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = () => {
    dispatch({ type: REDUCER_ACTIONS.clear, payload: state.cart[0] });
    setIsSubmit(true);
  };

  const content = (
    <main className="shopping-cart">
      {isSubmit ? (
        <p>Thank you for your order!</p>
      ) : state.cart.length === 0 ? (
        <p>The cart is empty...</p>
      ) : (
        state.cart.map((prod) => <CartItem theme={theme} prod={prod} />)
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
