import {
  useContext,
  useReducer,
  createContext,
  ReactElement,
  useMemo,
  useState
} from "react";
import { ComputerType, useProductContext } from "./ProductContext";
import { Themes } from "../App";

type sortType = "A" | "B" | "C"

type DisplayContextType = {
  searchResult: string;
  selectedProcess: string;
  minPriceRange: number;
  selectedProduct: string;
  selectedSort: sortType;
};

const initDisplayContext = {
  searchResult: "",
  selectedProcess: "",
  minPriceRange: 0,
  selectedProduct: "",
  selectedSort: "A" as sortType,
};

const REDUCER_ACTIONS_TYPE = {
  getSearchResult: "getSearchResult",
  getSelectedProcess: "getSeletedProcess",
  getMidPriceRange: "getMidPriceRange",
  getSelectedProduct: "getSelectedProduct",
  getSelectedSort: "getSelectedSort",
};

export type ReducerActionsType = typeof REDUCER_ACTIONS_TYPE;

type ReducerActions = {
  type: string;
  payload: string  | sortType;
};

const reducer = (
  state: DisplayContextType,
  action: ReducerActions
): DisplayContextType => {
  switch (action.type) {
    case REDUCER_ACTIONS_TYPE.getMidPriceRange:
      return { ...state, minPriceRange: parseInt(action.payload) };
    case REDUCER_ACTIONS_TYPE.getSearchResult:
      return { ...state, searchResult: action.payload };
    case REDUCER_ACTIONS_TYPE.getSelectedProcess:
      return {
        ...state,
        selectedProcess:
          action.payload === state.selectedProcess ? "" : action.payload,
      };
    case REDUCER_ACTIONS_TYPE.getSelectedProduct:
      return { ...state, selectedProduct: action.payload };
    case REDUCER_ACTIONS_TYPE.getSelectedSort:
      return { ...state, selectedSort: action.payload as sortType};
    default:
      throw new Error("action type undefined in Display Context");
  }
};

const useDisplayContext = (initDisplayContext: DisplayContextType) => {
  const [state, dispatch] = useReducer(reducer, initDisplayContext);
  const [theme, setTheme] = useState<Themes>("dark");

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTIONS_TYPE;
  }, []);

  const handleProductDisplay = (): ComputerType[] => {
    const productData = useProductContext();

    let filteredProduct = productData.filter(
      (prod) => prod.price > state.minPriceRange
    );
    state.selectedProcess === ""
      ? null
      : (filteredProduct = filteredProduct.filter(
          (prod) => prod.process === state.selectedProcess
        ));
    state.searchResult === ""
      ? null
      : (filteredProduct = filteredProduct.filter((prod) =>
          prod.name
            .toLowerCase()
            .includes(state.searchResult.trim().toLowerCase())
        ));
      
      switch(state.selectedSort){
        case "A": filteredProduct.sort((a ,b ) => a.price - b.price)
          break;
        case "B": filteredProduct.sort((a ,b ) => b.price - a.price)
          break;
        case "C": filteredProduct.sort((a ,b ) => a.name.localeCompare(b.name))
          break;
        default: throw new Error("Unexpected Sort Type in Display Context");
      }
    return filteredProduct
  };

  return { state, dispatch, REDUCER_ACTIONS, handleProductDisplay, theme, setTheme };
};

export type useDisplayContextType = ReturnType<typeof useDisplayContext>;

const initDisplayContextType: useDisplayContextType = {
  state: initDisplayContext,
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
  handleProductDisplay: () => [],
  theme: "dark",
  setTheme: () =>{}
};

const ProductDisplayContext = createContext<useDisplayContextType>(
  initDisplayContextType
);

type ChildrenType = { children: ReactElement | ReactElement[] };

export const ProductDisplayContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <ProductDisplayContext.Provider
      value={useDisplayContext(initDisplayContext)}
    >
      {children}
    </ProductDisplayContext.Provider>
  );
};

export const useProductDisplayContext = () => {
  const { state, dispatch, REDUCER_ACTIONS, handleProductDisplay, theme, setTheme } = useContext(
    ProductDisplayContext
  );

  return { state, dispatch, REDUCER_ACTIONS, handleProductDisplay, theme, setTheme };
};

export default ProductDisplayContext;
