import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoonStar } from "react-icons/lu";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const ThemeToggle = () => {
  //Getting Theme from Context
  const { theme, setTheme } = useProductDisplayContext();
  //Icon Switch Logic
  const pageContent = theme === "dark" ? <MdOutlineWbSunny /> : <LuMoonStar />;
  //Button HTML Return
  const content = (
    <span
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={theme === "dark" ? "span-dark" : "span-light"}
    >
      {pageContent}
    </span>
  );
  return content;
};

export default ThemeToggle;
