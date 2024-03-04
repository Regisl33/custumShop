import {
  useState,
  useContext,
  useEffect,
  createContext,
  ReactElement,
} from "react";

type SpecsType = {
  processor: string;
  memory: string;
  storage: string;
  videoCard: string;
};

export type ComputerType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
  process: string;
  specs: SpecsType;
};

type ProductContextType = ComputerType[];

const initProductContext: ComputerType[] = [];

const ProductContext = createContext<ProductContextType>(initProductContext);

type childrenType = { children: ReactElement | ReactElement[] };

export const ProductContextProvider = ({
  children,
}: childrenType): ReactElement => {
  const [productData, setProductData] = useState<ComputerType[]>([]);

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

    fetchProduct().then((products) => setProductData(products));
  }, []);

  return (
    <ProductContext.Provider value={productData}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const productData = useContext(ProductContext);
  return productData;
};

export default ProductContext;
