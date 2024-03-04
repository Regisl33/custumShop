import { displayViews } from "../App";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Header = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  const pageContent =
    activeDisplay === "cart" ? (
      <button onClick={() => setActiveDisplay("shop")}>
        <FaHome />
      </button>
    ) : (
      <button onClick={() => setActiveDisplay("cart")}>
        <FaCartShopping />
      </button>
    );

  const content = (
    <header>
      <h1>Computer Shop</h1>
      <nav aria-label="Main Shop Nav">
        <ul>
          <li aria-label="search-bar">
            <label className="offscreen" htmlFor="search">
              Search-Bar
            </label>
            <input type="text" id="search" placeholder="Search" />
          </li>
          <li aria-label="price-range-selector">
            <label className="offscreen" htmlFor="priceRange">
              Price Range Input
            </label>{" "}
            <input type="range" id="priceRange" min={800} max={4000} />
            <span></span>
          </li>
          <li aria-label="processor-checkbox">
            <label htmlFor="amd">Amd</label>
            <input type="radio" id="amd" name="process" />
            <label htmlFor="intel">Intel</label>
            <input type="radio" id="intel" name="process" />
          </li>
          <li aria-label="cart-button">{pageContent}</li>
        </ul>
      </nav>
    </header>
  );
  return content;
};

export default Header;
