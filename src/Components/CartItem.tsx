import { ComputerType } from "../Context/ProductContext";
import { useCartContextState } from "../Context/CartContext";
import { FiMinus } from "react-icons/fi"
import { MdDeleteForever } from "react-icons/md";

type PropsType = {
  prod: ComputerType;
};

const CartItem = ({ prod }: PropsType) => {
  const { dispatch, REDUCER_ACTIONS } = useCartContextState();

  const url = `./src/assets/Images/${prod.sku}.jpg`;

  const totalPrice = prod.price * prod.qty;

  const content = (
    <div className="cartRow">
      <img src={url} alt={prod.name} />
      <h3>{prod.name}</h3>
      <span>{prod.qty}</span>
      <span
        className="span"
        onClick={() =>
          dispatch({ type: REDUCER_ACTIONS.remove, payload: prod })
        }
      >
        <FiMinus/>
      </span>
      <p>{totalPrice}$</p>
      <span
        className="span"
        onClick={() =>
          dispatch({ type: REDUCER_ACTIONS.delete, payload: prod })
        }
      >
        <MdDeleteForever />
      </span>
    </div>
  );
  return content;
};

export default CartItem;
