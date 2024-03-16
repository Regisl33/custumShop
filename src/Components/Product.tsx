import { ComputerType } from "../Context/ProductContext";
import { displayViews } from "../App";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

type PropsType = {
  prod: ComputerType;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Product = ({ prod, setActiveDisplay }: PropsType) => {
  const { dispatch, REDUCER_ACTIONS } = useProductDisplayContext();

  const url = `./src/assets/Images/${prod.sku}.jpg`;

  const displayProductInfos = (sku: string) => {
    dispatch({ type: REDUCER_ACTIONS.getSelectedProduct, payload: sku });
    setActiveDisplay("product");
  };

  const content = (
    <figure className="product-card">
      <img src={url} alt={prod.name} />
      <h2>{prod.name}</h2>
      <p>{prod.price}</p>
      <button
        className="btn"
        id={prod.sku}
        onClick={(e: any) => displayProductInfos(e.target.id)}
      >
        More Infos
      </button>
    </figure>
  );

  return content;
};

export default Product;
