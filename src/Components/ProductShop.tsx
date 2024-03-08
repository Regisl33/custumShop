import Product from "./Product";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const ProductShop = () => {
  const {handleProductDisplay} = useProductDisplayContext();

  const pageContent = handleProductDisplay();

  const content = pageContent.map((prod) => (
    <Product key={prod.sku} prod={prod} />
  ));

  return content;
};

export default ProductShop;
