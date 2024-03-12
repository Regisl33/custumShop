import { useCartContextState } from "../Context/CartContext";
import CartItem from "./CartItem";

const ShoppingCart = () => {
  const {state, dispatch, REDUCER_ACTIONS} = useCartContextState();

  const content = (
    <main>
      {state.cart.map((prod) => <CartItem prod={prod} />)}
      <button onClick={() => dispatch({type:REDUCER_ACTIONS.clear, payload: state.cart[0]})}>Submit Order</button>
    </main>
  )
  return content;
};

export default ShoppingCart;
