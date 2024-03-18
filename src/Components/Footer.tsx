import { displayViews, Themes } from "../App";
import { useCartContextState } from "../Context/CartContext";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
  theme: Themes;
};

const Footer = ({ activeDisplay, setActiveDisplay, theme }: PropsType) => {
  const { CartTotalPrice } = useCartContextState();

  const year = new Date().getFullYear();

  const pageContent =
    activeDisplay === "shop" ? (
      <button
        className={theme === "dark" ? "btn-light" : "btn-dark"}
        onClick={() => setActiveDisplay("cart")}
      >
        View Cart
      </button>
    ) : (
      <button
        className={theme === "dark" ? "btn-dark" : "btn-light"}
        onClick={() => setActiveDisplay("shop")}
      >
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
