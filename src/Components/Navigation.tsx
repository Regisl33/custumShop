import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import CPUCheck from "./CPUCheck";
import SortSelect from "./SortSelect";
import ThemeToggle from "./ThemeToggle";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { PropsType } from "./Header";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Navigation = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  //Getting Theme from Context
  const { theme } = useProductDisplayContext();
  //Cart/Shop Button Switch Logic
  const pageContent =
    activeDisplay === "cart" ? (
      <button
        className={theme === "dark" ? "span-dark" : "span-light"}
        onClick={() => setActiveDisplay("shop")}
      >
        <FaHome />
      </button>
    ) : (
      <button
        className={theme === "dark" ? "span-dark" : "span-light"}
        onClick={() => setActiveDisplay("cart")}
      >
        <FaCartShopping />
      </button>
    );
  //Main Nav HTML Return
  const content = (
    <nav
      className={theme === "dark" ? "navigation-dark" : "navigation-light"}
      aria-label="Main Shop Nav"
    >
      <ul className="main-nav">
        <SearchBar />
        <PriceRange />
        <CPUCheck />
        <SortSelect />
      </ul>
      <div aria-label="Cart-Button">{pageContent}</div>
      <div aria-label="Theme-Toggle">
        <ThemeToggle />
      </div>
    </nav>
  );

  return content;
};

export default Navigation;
