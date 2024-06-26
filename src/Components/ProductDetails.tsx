import { IoMdCloseCircleOutline } from "react-icons/io";
import { ComputerType } from "../Context/ProductContext";
import { useCartContextState } from "../Context/CartContext";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
//Props Type
type PropsType = {
  currentProduct: ComputerType | undefined;
};

const ProductDetails = ({ currentProduct }: PropsType) => {
  //Getting Context
  const { dispatch, REDUCER_ACTIONS } = useCartContextState();
  const { theme } = useProductDisplayContext();
  //Display Specs Logic on small Screen
  const classToggler = () => {
    const specs = document.getElementById("specs");
    specs?.classList.toggle("active");
  };
  //Test if there is a current Product
  if (currentProduct) {
    //Dynamic Image URL
    const url = `./src/assets/Images/${currentProduct.sku}.jpg`;
    //Details HTML Return
    const content = (
      <figure className="product-details">
        <img
          src={url}
          alt={currentProduct.name}
          className={theme === "dark" ? "img-dark" : "img-light"}
        />
        <div className="specs">
          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.price}$</p>
          <h4 onClick={() => classToggler()}>Specifications</h4>
          <div
            className={theme === "dark" ? "tinySpecs-dark" : "tinySpecs-light"}
            id="specs"
          >
            <span
              className={theme === "dark" ? "span-dark" : "span-light"}
              aria-label="close-btn"
              onClick={() => classToggler()}
            >
              <IoMdCloseCircleOutline />
            </span>
            <p>Processor:{currentProduct.specs.processor}</p>
            <p>Memory:{currentProduct.specs.memory}</p>
            <p>Storage:{currentProduct.specs.storage}</p>
            <p>Graphic Card:{currentProduct.specs.videoCard}</p>
          </div>
          <ul className="wideSpecs">
            <li>Processor:{currentProduct.specs.processor}</li>
            <li>Memory:{currentProduct.specs.memory}</li>
            <li>Storage:{currentProduct.specs.storage}</li>
            <li>Graphic Card:{currentProduct.specs.videoCard}</li>
          </ul>
          <button
            className={theme === "dark" ? "btn-dark" : "btn-light"}
            onClick={() =>
              dispatch({ type: REDUCER_ACTIONS.add, payload: currentProduct })
            }
          >
            Add To Cart
          </button>
        </div>
      </figure>
    );
    return content;
  } else {
    //Display an error if there is no current Product
    const error = <h2>No product to display, try reloading the page...</h2>;

    return error;
  }
};

export default ProductDetails;
