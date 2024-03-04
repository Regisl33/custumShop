import { ComputerType } from "../Context/ProductContext";

type PropsType = {
  prod: ComputerType;
};

const Product = ({ prod }: PropsType) => {
  const content = (
    <figure>
      <h2>{prod.name}</h2>
      <p>{prod.price}</p>
    </figure>
  );
  return content;
};

export default Product;
