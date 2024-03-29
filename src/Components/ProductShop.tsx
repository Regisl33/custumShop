import Product from "./Product";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { displayViews } from "../App";

type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const ProductShop = ({ setActiveDisplay}: PropsType) => {
  const { handleProductDisplay } = useProductDisplayContext();


  const data = handleProductDisplay();

  const pageContent = data.map((prod) => (
    <Product
      key={prod.sku}
      prod={prod}
      setActiveDisplay={setActiveDisplay}
    />
  ));

  const content = <main className="Product-Shop">{pageContent}</main>;

  return content;
};

export default ProductShop;
