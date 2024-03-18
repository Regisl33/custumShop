import { Themes } from "../App";
import { MdOutlineWbSunny } from "react-icons/md";
import { LuMoonStar } from "react-icons/lu";

type PropsType = {
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
};

const ThemeToggle = ({ theme, setTheme }: PropsType) => {
  const pageContent = theme === "dark" ? <MdOutlineWbSunny /> : <LuMoonStar />;

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
