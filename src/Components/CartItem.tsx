import { ComputerType } from "../Context/ProductContext";

type PropsType = {
  prod: ComputerType,
}

const CartItem = ({prod}:PropsType) => {

  const content = (
    <div className="cartRow">
      <p></p>
    </div>
  )
  return content;
};

export default CartItem;