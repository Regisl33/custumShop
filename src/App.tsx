import { useEffect, useState } from "react";
import ProductShop from "./Components/ProductShop";
import ShoppingCart from "./Components/ShoppingCart";
import ProductInfo from "./Components/ProductInfo";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { useProductDisplayContext } from "./Context/ProductDisplayContext";
//Type of activeDisplay, it is theThree possible Display
export type displayViews = "shop" | "cart" | "product";

const App = () => {
  //Display State
  const [activeDisplay, setActiveDisplay] = useState<displayViews>("shop");
  //Getting the Theme
  const { theme } = useProductDisplayContext();
  //Theme Switch Logic
  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);
  //Display Switch Logic
  const pageContent =
    activeDisplay === "shop" ? (
      <ProductShop setActiveDisplay={setActiveDisplay} />
    ) : activeDisplay === "cart" ? (
      <ShoppingCart />
    ) : (
      <ProductInfo setActiveDisplay={setActiveDisplay} />
    );
  //App Content
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
