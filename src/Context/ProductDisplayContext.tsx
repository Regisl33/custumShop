import {
  useContext,
  useReducer,
  createContext,
  ReactElement,
  useMemo,
  useState,
} from "react";
import { ComputerType, useProductContext } from "./ProductContext";
//Type of selectedSort, the 3 sort method possible
type sortType = "A" | "B" | "C";
//Type of the State
type DisplayContextType = {
  searchResult: string;
  selectedProcess: string;
  minPriceRange: number;
  selectedProduct: string;
  selectedSort: sortType;
};
//Default Value of the State
const initDisplayContext = {
  searchResult: "",
  selectedProcess: "",
  minPriceRange: 0,
  selectedProduct: "",
  selectedSort: "A" as sortType,
};
//Actions for the reducer
const REDUCER_ACTIONS_TYPE = {
  getSearchResult: "getSearchResult",
  getSelectedProcess: "getSeletedProcess",
  getMidPriceRange: "getMidPriceRange",
  getSelectedProduct: "getSelectedProduct",
  getSelectedSort: "getSelectedSort",
};
//Type of the reducer Actions
export type ReducerActionsType = typeof REDUCER_ACTIONS_TYPE;
//Type of the Theme, the 2 Theme possible
type Themes = "light" | "dark";
//Type of action
type ReducerActions = {
  type: string;
  payload: string | sortType;
};
//State Reducer
const reducer = (
  state: DisplayContextType,
  action: ReducerActions
): DisplayContextType => {
  switch (action.type) {
    //Convert the Range input value to a Number and stores it in minPriceRange
    case REDUCER_ACTIONS_TYPE.getMidPriceRange:
      return { ...state, minPriceRange: parseInt(action.payload) };
    //Stores the Search input value in searchResult
    case REDUCER_ACTIONS_TYPE.getSearchResult:
      return { ...state, searchResult: action.payload };
    //Stores the CPU Checkbox value in selectedProcess and checks if it is already there and if so it empty selectedProcess
    case REDUCER_ACTIONS_TYPE.getSelectedProcess:
      return {
        ...state,
        selectedProcess:
          action.payload === state.selectedProcess ? "" : action.payload,
      };
    //Stores the Select value in selectedSort
    case REDUCER_ACTIONS_TYPE.getSelectedSort:
      return { ...state, selectedSort: action.payload as sortType };
    //Stores the product you Click on More Infos in selectedProduct
    case REDUCER_ACTIONS_TYPE.getSelectedProduct:
      return { ...state, selectedProduct: action.payload };
    //default Error
    default:
      throw new Error("action type undefined in Display Context");
  }
};
//Custom Hook that will be used as the Context Value
const useDisplayContext = (initDisplayContext: DisplayContextType) => {
  //State and Dispatch from the reducer
  const [state, dispatch] = useReducer(reducer, initDisplayContext);
  //State of the Theme
  const [theme, setTheme] = useState<Themes>("dark");
  //Memoized Reducer Actions
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTIONS_TYPE;
  }, []);
  //Display Filtered Computer Logic
  const handleProductDisplay = (): ComputerType[] => {
    //Get the productData from ProductContext
    const productData = useProductContext();
    //Filter by the Price Range
    let filteredProduct = productData.filter(
      (prod) => prod.price > state.minPriceRange
    );
    //Filter by the CPU if selected
    state.selectedProcess === ""
      ? null
      : (filteredProduct = filteredProduct.filter(
          (prod) => prod.process === state.selectedProcess
        ));
    //Filter by search Value if existing
    state.searchResult === ""
      ? null
      : (filteredProduct = filteredProduct.filter((prod) =>
          prod.name
            .toLowerCase()
            .includes(state.searchResult.trim().toLowerCase())
        ));
    //Computer Sorting Logic A = Low -> High, B = High -> Low, C = Alphabetical.
    switch (state.selectedSort) {
      case "A":
        filteredProduct.sort((a, b) => a.price - b.price);
        break;
      case "B":
        filteredProduct.sort((a, b) => b.price - a.price);
        break;
      case "C":
        filteredProduct.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        throw new Error("Unexpected Sort Type in Display Context");
    }
    return filteredProduct;
  };
  //Custom Hook Return
  return {
    state,
    dispatch,
    theme,
    setTheme,
    REDUCER_ACTIONS,
    handleProductDisplay,
  };
};
//Type of the Context
export type useDisplayContextType = ReturnType<typeof useDisplayContext>;
//Default Value of the Context
const initDisplayContextType: useDisplayContextType = {
  state: initDisplayContext,
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
  handleProductDisplay: () => [],
  theme: "dark",
  setTheme: () => {},
};
//Create Context
const ProductDisplayContext = createContext<useDisplayContextType>(
  initDisplayContextType
);
//Children Type
type ChildrenType = { children: ReactElement | ReactElement[] };
//Context Provider
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
//Custom Hook to acces all the Context infos
export const useProductDisplayContext = () => {
  const {
    state,
    dispatch,
    REDUCER_ACTIONS,
    handleProductDisplay,
    theme,
    setTheme,
  } = useContext(ProductDisplayContext);

  return {
    state,
    dispatch,
    REDUCER_ACTIONS,
    handleProductDisplay,
    theme,
    setTheme,
  };
};

export default ProductDisplayContext;
