import { useEffect, useState } from "react";
import ProductShop from "./Components/ProductShop";
import ProductInfo from "./Components/ProductInfo";
import ShoppingCart from "./Components/ShoppingCart";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useProductDisplayContext } from "./Context/ProductDisplayContext";

export type displayViews = "shop" | "cart" | "product";

export type Themes = "light" | "dark";

export type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const App = () => {
  const [activeDisplay, setActiveDisplay] = useState<displayViews>("shop");
  const {theme} = useProductDisplayContext()

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  const pageContent =
    activeDisplay === "shop" ? (
      <ProductShop setActiveDisplay={setActiveDisplay} />
    ) : activeDisplay === "cart" ? (
      <ShoppingCart />
    ) : (
      <ProductInfo setActiveDisplay={setActiveDisplay} />
    );

  const content = (
    <>
      <Header
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
      />
      {pageContent}
      <Footer
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
      />
    </>
  );

  return content;
};

export default App;
