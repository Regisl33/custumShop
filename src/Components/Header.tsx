import Logo from "./Logo";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { PropsType } from "../App";

const Header = ({
  activeDisplay,
  setActiveDisplay,
  theme,
  setTheme,
}: PropsType) => {
  const content = (
    <header id="header">
      <Logo theme={theme} />
      <Navigation
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
        theme={theme}
        setTheme={setTheme}
      />
      <Sidebar theme={theme} />
    </header>
  );

  return content;
};

export default Header;
