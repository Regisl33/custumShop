import { FiMinus } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { ComputerType } from "../Context/ProductContext";
import { useCartContextState } from "../Context/CartContext";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
//Props Type
type PropsType = {
  prod: ComputerType;
};

const CartItem = ({ prod }: PropsType) => {
  //Getting Context
  const { dispatch, REDUCER_ACTIONS } = useCartContextState();
  const { theme } = useProductDisplayContext();
  //Dynamic Image URL
  const url = `./src/assets/Images/${prod.sku}.jpg`;
  //Total Price Logic
  const totalPrice = prod.price * prod.qty;
  //Cart Item HTML Return
  const content = (
    <div className={theme === "dark" ? "cartRow-dark" : "cartRow-light"}>
      <img
        src={url}
        alt={prod.name}
      />
      <h3>{prod.name}</h3>
      <div className="cart-grid">
        <span>{prod.qty}</span>
        <span
          className={theme === "dark" ? "span-dark" : "span-light"}
          onClick={() =>
            dispatch({ type: REDUCER_ACTIONS.remove, payload: prod })
          }
        >
          <FiMinus />
        </span>
        <p>{totalPrice}$</p>
        <span
          className={theme === "dark" ? "span-dark" : "span-light"}
          onClick={() =>
            dispatch({ type: REDUCER_ACTIONS.delete, payload: prod })
          }
        >
          <MdDeleteForever />
        </span>
      </div>
    </div>
  );
  return content;
};

export default CartItem;
