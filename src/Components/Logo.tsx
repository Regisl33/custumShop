import { PiComputerTowerBold } from "react-icons/pi";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Logo = () => {
  const {theme} = useProductDisplayContext()
  const content = (
    <div className={theme === "dark" ? "logo-dark" : "logo-light"}>
      <h1>Computer Shop</h1>
      <span>
        <PiComputerTowerBold />
      </span>
    </div>
  );
  return content;
};

export default Logo;
