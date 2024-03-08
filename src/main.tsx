import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./assets/Style/index.scss"
import { ProductContextProvider } from './Context/ProductContext.tsx'
import {ProductDisplayContextProvider} from './Context/ProductDisplayContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProductContextProvider>
      <ProductDisplayContextProvider>
        <App />
      </ProductDisplayContextProvider>
    </ProductContextProvider>
  </React.StrictMode>,
)
