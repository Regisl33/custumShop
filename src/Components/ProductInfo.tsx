import ProductDetails from "./ProductDetails";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { displayViews } from "../App";
import { ComputerType, useProductContext } from "../Context/ProductContext";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
//Props Type
type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const ProductInfo = ({ setActiveDisplay }: PropsType) => {
  //Getting Context
  const { state, theme } = useProductDisplayContext();
  const productData = useProductContext();
  //Define currentProduct
  let currentProduct: ComputerType | undefined;

  productData.map((prod) => {
    if (prod.sku === state.selectedProduct) {
      currentProduct = prod;
    } else {
      null;
    }
  });
  //Main HTML Return
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
