import { displayViews } from "../App";
import { useCartContextState } from "../Context/CartContext";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Footer = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  const { CartTotalPrice } = useCartContextState();

  const year = new Date().getFullYear();

  const pageContent =
    activeDisplay === "shop" ? (
      <button className="btn" onClick={() => setActiveDisplay("cart")}>
        View Cart
      </button>
    ) : (
      <button className="btn" onClick={() => setActiveDisplay("shop")}>
        View Shop
      </button>
    );

  const content = (
    <footer>
      {activeDisplay === "shop" ? <p>Total: {CartTotalPrice}$</p> : null}
      <p>All rights reserved &copy; {year}</p>
      {pageContent}
    </footer>
  );
  return content;
};

export default Footer;
