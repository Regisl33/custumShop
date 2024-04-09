import HamburgerMenu from "./HamburgerMenu";
import SearchBar from "./SearchBar";
import PriceRange from "./PriceRange";
import CPUCheck from "./CPUCheck";
import SortSelect from "./SortSelect";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Sidebar = () => {
  const { theme } = useProductDisplayContext();
  //Sidebar HTML Return
  const content = (
    <div className={theme === "dark" ? "sidebar-dark" : "sidebar-light"}>
      <HamburgerMenu />
      <nav
        className="sidebar-nav"
        aria-label="Sidebar Shop Nav"
      >
        <ul>
          <SearchBar />
          <PriceRange />
          <CPUCheck />
          <SortSelect />
        </ul>
      </nav>
    </div>
  );
  return content;
};

export default Sidebar;
