import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactElement,
} from "react";
//Specification Type
type SpecsType = {
  processor: string;
  memory: string;
  storage: string;
  videoCard: string;
};
//Full Product(computer) Type
export type ComputerType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
  process: string;
  specs: SpecsType;
};
//Type of the Context
type ProductContextType = ComputerType[];
//Default Value of the Context
const initProductContext: ComputerType[] = [];
//Create Context
const ProductContext = createContext<ProductContextType>(initProductContext);
//Children Type
type childrenType = { children: ReactElement | ReactElement[] };
//Context Provider
export const ProductContextProvider = ({
  children,
}: childrenType): ReactElement => {
  //Products State
  const [productData, setProductData] = useState<ComputerType[]>([]);
  //Fetching the products
  useEffect(() => {
    const fetchProduct = async (): Promise<ComputerType[]> => {
      const fetchedData: Promise<ComputerType[]> = await fetch(
        "http://localhost:3000/products"
      )
        .then((res) => {
          return res.json();
        })
        .catch((err) => console.log(err.message));
      return fetchedData;
    };
    //Setting the products State
    fetchProduct().then((products) => setProductData(products));
  }, []);
  //Return the provider with the products
  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
};
//Custom Hook to use the productData
export const useProductContext = () => {
  const productData = useContext(ProductContext);
  return productData;
};

export default ProductContext;
