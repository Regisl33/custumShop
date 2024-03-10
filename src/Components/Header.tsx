import { displayViews } from "../App";
import Navigation from "./Navigation";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Header = ({ activeDisplay, setActiveDisplay }: PropsType) => {
  
  const content = (
    <header>
      <h1>Computer Shop</h1>
      <Navigation activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
    </header>
  );
  
  return content;
};

export default Header;
