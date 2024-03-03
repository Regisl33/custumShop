import { useState, useContext, useEffect, createContext, ReactElement } from "react";

type SpecsType = {
  processor: string,
  memory: string,
  storage: string,
  videoCard: string
}

export type ComputerType = {
  sku: string,
  name: string,
  price: number,
  qty: number,
  process: string,
  specs: SpecsType
}

type ProductContextType = ComputerType[] 

const initProductContext:ComputerType[] = []

const ProductContext = createContext<ProductContextType>(initProductContext);

type childrenType = {children: ReactElement | ReactElement[] }

export const ProductContextProvider = ( { children }:childrenType): ReactElement =>{
  const [productData, setProductData] = useState<ComputerType[]>([])
  const [productDisplay, setProductDisplay] = useState<ComputerType[]>([])
  const [filteredPrice, setFilteredPrice] = useState<number>(0)
  const [filteredSearch, setFilteredSearch] = useState<string>("")
  const [filteredProcess, setFilteredProcess] = useState<string>("")

  useEffect(()=> {
    const fetchProduct = async ():Promise<ComputerType[]> => {
      const fetchedData:Promise<ComputerType[]> = await fetch("http://localhost:3000/products").then(res => {return res.json()}).catch(err => console.log(err.message))
      return fetchedData
    }

    fetchProduct().then(products => setProductData(products))
    setProductDisplay(productData);
  }, [])

  const getFilteredProduct = () => {
    const filteredProduct = productData.filter((prod) => prod.price > filteredPrice).filter((prod) => prod.process === filteredProcess).filter((prod) => prod.name.toLowerCase().includes(filteredSearch.toLowerCase()))
    setProductDisplay(filteredProduct)
  }

  const getFilteredSearch = (value:string) => {
    setFilteredSearch(value)
  }
  const getFilteredProcess = (value:string) => {
    setFilteredProcess(value)
  }
  const getFilteredPrice = (value:string) => {
    setFilteredPrice(parseInt(value))
  }

  const getFullProduct = (id:string) =>{
    let currentProduct:ComputerType | undefined;
    productData.map((prod) => prod.sku === id ? currentProduct = prod : null )
    if (currentProduct) return currentProduct
  }
  
  return(
    <ProductContext.Provider value={productDisplay}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductContext