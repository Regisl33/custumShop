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
    <div
      style={{
        background: theme === "dark" ? "#0f0fe2" : "#0072fe",
        color: theme === "dark" ? "#f3f3f3" : "#090909",
      }}
      className="sidebar"
    >
      <HamburgerMenu />
      <nav className="sidebar-nav" aria-label="Sidebar Shop Nav">
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
