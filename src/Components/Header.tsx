import { displayViews } from "../App";
import Logo from "./Logo";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { Themes } from "../App";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
};

const Header = ({
  activeDisplay,
  setActiveDisplay,
  theme,
  setTheme,
}: PropsType) => {
  const content = (
    <header>
      <Logo />
      <Navigation
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
        theme={theme}
        setTheme={setTheme}
      />
      <Sidebar />
    </header>
  );

  return content;
};

export default Header;
