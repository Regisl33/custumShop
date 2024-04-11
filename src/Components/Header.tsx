import Logo from "./Logo";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import { displayViews } from "../App";
//Full Props Type
export type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Header = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  //Header HTML Return
  const content = (
    <header id="header">
      <Logo />
      <Navigation
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
      />
      <Sidebar />
    </header>
  );

  return content;
};

export default Header;
