import { useCartContextState } from "../Context/CartContext";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { PropsType } from "./Header";

const Footer = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  const { CartTotalPrice } = useCartContextState();
  const { theme } = useProductDisplayContext();

  const year = new Date().getFullYear();

  const backToTopBtn = (
    <div className="backTop">
      <span className={theme === "dark" ? "span-dark" : "span-light"}>
        <a
          href="#header"
          className={theme === "dark" ? "link-dark" : "link-light"}
        >
          <FaArrowAltCircleUp />
        </a>
      </span>
    </div>
  );

  const pageContent =
    activeDisplay === "cart" ? (
      <button
        className={theme === "dark" ? "btn-dark" : "btn-light"}
        onClick={() => setActiveDisplay("shop")}
      >
        View Shop
      </button>
    ) : (
      <button
        className={theme === "dark" ? "btn-dark" : "btn-light"}
        onClick={() => setActiveDisplay("cart")}
      >
        View Cart
      </button>
    );

  const content = (
    <footer>
      <hr className={theme === "dark" ? "hr-dark" : "hr-light"} />
      {activeDisplay === "cart" ? null : <p>Total: {CartTotalPrice}$</p>}
      <p className="copyright">All rights reserved &copy; {year}</p>
      <div className="buttons">
        {pageContent}
        {activeDisplay !== "product" ? backToTopBtn : null}
      </div>
    </footer>
  );
  return content;
};

export default Footer;
