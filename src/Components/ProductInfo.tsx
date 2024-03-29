import { displayViews } from "../App";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { ComputerType, useProductContext } from "../Context/ProductContext";
import ProductDetails from "./ProductDetails";
import { IoMdCloseCircleOutline } from "react-icons/io";

type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const ProductInfo = ({ setActiveDisplay }: PropsType) => {
  const { state, theme } = useProductDisplayContext();
  const productData = useProductContext();

  let currentProduct: ComputerType | undefined;

  productData.map((prod) => {
    if (prod.sku === state.selectedProduct) {
      currentProduct = prod;
    } else {
      null;
    }
  });

  const content = (
    <main className="product-infos">
      <span
        className={theme === "dark" ? "span-dark" : "span-light"}
        aria-label="close-btn"
        onClick={() => setActiveDisplay("shop")}
      >
        <IoMdCloseCircleOutline />
      </span>
      <ProductDetails currentProduct={currentProduct} />
    </main>
  );

  return content;
};

export default ProductInfo;
