import { ComputerType } from "../Context/ProductContext";

type PropsType = {
  currentProduct: ComputerType | undefined;
};

const ProductDetails = ({ currentProduct }: PropsType) => {
  if (currentProduct) {
    const url = `./src/assets/Images/${currentProduct.sku}.jpg`;

    const content = (
      <figure className="product-details">
        <img src={url} alt={currentProduct.name} />
        <div className="specs">
          <h2>{currentProduct.name}</h2>
          <p>{currentProduct.price}$</p>
          <h4>Specifications</h4>
          <ul>
            <li>Processor:{currentProduct.specs.processor}</li>
            <li>Memory:{currentProduct.specs.memory}</li>
            <li>Storage:{currentProduct.specs.storage}</li>
            <li>Graphic Card:{currentProduct.specs.videoCard}</li>
          </ul>
          <button>Add To Cart</button>
        </div>
      </figure>
    );
    return content;
  } else {
    const error = <h2>No product to display, try reloading the page...</h2>;

    return error;
  }
};

export default ProductDetails;
