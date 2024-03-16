import { useCartContextState } from "../Context/CartContext";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const { state, dispatch, REDUCER_ACTIONS, CartTotalPrice } =
    useCartContextState();

  const content = (
    <main className="shopping-cart">
      {state.cart.map((prod) => (
        <CartItem prod={prod} />
      ))}
      <p>Total: {CartTotalPrice}$</p>
      <button
        className="btn"
        onClick={() =>
          dispatch({ type: REDUCER_ACTIONS.clear, payload: state.cart[0] })
        }
      >
        Submit Order
      </button>
    </main>
  );
  return content;
};

export default ShoppingCart;
