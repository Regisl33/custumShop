import { ComputerType } from "../Context/ProductContext";
import { Themes, displayViews } from "../App";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

type PropsType = {
  prod: ComputerType;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
  theme: Themes;
};

const Product = ({ prod, setActiveDisplay, theme }: PropsType) => {
  const { dispatch, REDUCER_ACTIONS } = useProductDisplayContext();

  const url = `./src/assets/Images/${prod.sku}.jpg`;

  const displayProductInfos = (sku: string) => {
    dispatch({ type: REDUCER_ACTIONS.getSelectedProduct, payload: sku });
    setActiveDisplay("product");
  };

  const content = (
    <figure className={theme=== "dark" ? "product-card-dark" : "product-card-light"}>
      <img src={url} alt={prod.name} />
      <h2>{prod.name}</h2>
      <p>{prod.price}$</p>
      <button
        className={theme === "dark" ? "btn-dark" : "btn-light"}
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
