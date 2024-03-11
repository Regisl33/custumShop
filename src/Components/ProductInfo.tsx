import { displayViews } from "../App";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { ComputerType, useProductContext } from "../Context/ProductContext";
import ProductDetails from "./ProductDetails";

type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const ProductInfo = ({ setActiveDisplay }: PropsType) => {
  const { state } = useProductDisplayContext();
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
    <main>
      <ProductDetails currentProduct={currentProduct} />
    </main>
  );

  return content;
};

export default ProductInfo;
