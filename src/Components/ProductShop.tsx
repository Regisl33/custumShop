import Product from "./Product";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { Themes, displayViews } from "../App";

type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
  theme: Themes;
};

const ProductShop = ({ setActiveDisplay, theme }: PropsType) => {
  const { handleProductDisplay } = useProductDisplayContext();

  const data = handleProductDisplay();

  const pageContent = data.map((prod) => (
    <Product
      theme={theme}
      key={prod.sku}
      prod={prod}
      setActiveDisplay={setActiveDisplay}
    />
  ));

  const content = <main className="Product-Shop">{pageContent}</main>;

  return content;
};

export default ProductShop;
