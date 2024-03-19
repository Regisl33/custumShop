import { PiComputerTowerBold } from "react-icons/pi";
import { Themes } from "../App";

type PropsType = {
  theme: Themes
}

const Logo = ({theme}:PropsType) => {
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
