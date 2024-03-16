import { displayViews } from "../App";
import Logo from "./Logo";
import Navigation from "./Navigation";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Header = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  
  const content = (
    <header>
      <Logo />
      <Navigation activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
    </header>
  );
  
  return content;
};

export default Header;
