import { PropsType } from "../App";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import CPUCheck from "./CPUCheck";
import SortSelect from "./SortSelect";
import ThemeToggle from "./ThemeToggle";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Navigation = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  const { theme, setTheme } = useProductDisplayContext();
  //Cart/Shop Switch logic
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
      style={{
        background: theme === "dark" ? "#0f0fe2" : "#0072fe",
        color: theme === "dark" ? "#f3f3f3" : "#090909",
      }}
      className="navigation"
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
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );

  return content;
};

export default Navigation;