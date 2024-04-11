import Product from "./Product";
import { displayViews } from "../App";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
//Props Type
type PropsType = {
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const ProductShop = ({ setActiveDisplay }: PropsType) => {
  //Getting Context
  const { handleProductDisplay } = useProductDisplayContext();
  //Getting the Filtered Products
  const data = handleProductDisplay();
  //Display the Filtered Products
  const pageContent = data.map((prod) => (
    <Product
      key={prod.sku}
      prod={prod}
      setActiveDisplay={setActiveDisplay}
    />
  ));
  //Main HTML Return
  const content = <main className="Product-Shop">{pageContent}</main>;

  return content;
};

export default ProductShop;
