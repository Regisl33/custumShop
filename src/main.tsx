import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/Style/index.scss";
import { ProductContextProvider } from "./Context/ProductContext.tsx";
import { ProductDisplayContextProvider } from "./Context/ProductDisplayContext.tsx";
import { CartContextProvider } from "./Context/CartContext.tsx";
//Main application Logic
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ProductContextProvider>
      <ProductDisplayContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ProductDisplayContextProvider>
    </ProductContextProvider>
  </React.StrictMode>
);
