import { useProductContext } from "../Context/ProductContext";
import Product from "./Product";

const ProductShop = () => {
  const productData = useProductContext();

  const content = productData.map((prod) => (
    <Product key={prod.sku} prod={prod} />
  ));

  return content;
};

export default ProductShop;
