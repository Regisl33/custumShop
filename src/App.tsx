import { useEffect, useState } from "react";
import ProductShop from "./Components/ProductShop";
import ProductInfo from "./Components/ProductInfo";
import ShoppingCart from "./Components/ShoppingCart";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export type displayViews = "shop" | "cart" | "product";

export type Themes = "light" | "dark";

const App = () => {
  const [activeDisplay, setActiveDisplay] = useState<displayViews>("shop");
  const [theme, setTheme] = useState<Themes>("dark");

  useEffect(() => {
    const body = document.querySelector("body") as HTMLBodyElement;
    body.classList.remove("light", "dark");
    body.classList.add(theme);
  }, [theme]);

  const pageContent =
    activeDisplay === "shop" ? (
      <ProductShop theme={theme} setActiveDisplay={setActiveDisplay} />
    ) : activeDisplay === "cart" ? (
      <ShoppingCart theme={theme} />
    ) : (
      <ProductInfo theme={theme} setActiveDisplay={setActiveDisplay} />
    );

  const content = (
    <>
      <Header
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
        theme={theme}
        setTheme={setTheme}
      />
      {pageContent}
      <Footer
        activeDisplay={activeDisplay}
        setActiveDisplay={setActiveDisplay}
        theme={theme}
      />
    </>
  );

  return content;
};

export default App;
