import { useState } from "react";
import ProductShop from "./Components/ProductShop";
import ProductInfo from "./Components/ProductInfo";
import ShoppingCart from "./Components/ShoppingCart";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

export type displayViews = "shop" | "cart" | "product";

const App = () => {
  const [activeDisplay, setActiveDisplay] = useState<displayViews>("shop");

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
      <Footer />
    </>
  );

  return content;
};

export default App;
