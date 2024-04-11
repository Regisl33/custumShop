import { PiComputerTowerBold } from "react-icons/pi";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Logo = () => {
  //Getting Theme from Context
  const { theme } = useProductDisplayContext();
  //Logo HTML Return
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
