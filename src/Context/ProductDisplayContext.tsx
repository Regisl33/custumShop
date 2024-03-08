import { useContext, useReducer, createContext, ReactElement, useMemo } from "react";
import { ComputerType, useProductContext } from "./ProductContext";

type DisplayContextType = {
  searchResult: string;
  selectedProcess: string;
  minPriceRange: number;
};

const initDisplayContext = {
  searchResult: "",
  selectedProcess: "",
  minPriceRange: 0,
};

const REDUCER_ACTIONS_TYPE = {
  getSearchResult: "getSearchResult",
  getSelectedProcess: "getSeletedProcess",
  getMidPriceRange: "getMidPriceRange",
};

export type ReducerActionsType = typeof REDUCER_ACTIONS_TYPE;

type ReducerActions = {
  type: string;
  payload: string;
};

const reducer = (state: DisplayContextType, action: ReducerActions):DisplayContextType => {

  switch(action.type) {
    case REDUCER_ACTIONS_TYPE.getMidPriceRange: return {...state, minPriceRange: parseInt(action.payload)}
    case REDUCER_ACTIONS_TYPE.getSearchResult: return {...state, searchResult: action.payload}
    case REDUCER_ACTIONS_TYPE.getSelectedProcess: return {...state, selectedProcess: action.payload}
    default: throw new Error("action type undefined in Display Context") 
  }
};

const useDisplayContext = (initDisplayContext: DisplayContextType) =>{
  const[state, dispatch] = useReducer(reducer, initDisplayContext)

  const  REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTIONS_TYPE
  }, [])

  const handleProductDisplay = ():ComputerType[] =>{
    const productData = useProductContext();
  
    let filteredProduct = productData.filter((prod) => prod.price > state.minPriceRange)
    state.selectedProcess === "" ? null : filteredProduct = filteredProduct.filter((prod) => prod.process === state.selectedProcess)
    state.searchResult === "" ? null : filteredProduct = filteredProduct.filter((prod) => prod.name.toLowerCase().includes(state.searchResult.trim().toLowerCase()))

    return filteredProduct
  }

  return {state, dispatch, REDUCER_ACTIONS, handleProductDisplay}
}

export type useDisplayContextType = ReturnType<typeof useDisplayContext>

const initDisplayContextType: useDisplayContextType = {
  state: initDisplayContext,
  dispatch: () =>{},
  REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
  handleProductDisplay: () =>[],
}

const ProductDisplayContext = createContext<useDisplayContextType>(initDisplayContextType)

type ChildrenType = {children: ReactElement | ReactElement[]}

export const ProductDisplayContextProvider = ({children}:ChildrenType):ReactElement => {
  return (
    <ProductDisplayContext.Provider value={useDisplayContext(initDisplayContext)}>
      {children}
    </ProductDisplayContext.Provider>
  )
}

export const useProductDisplayContext = () => {
  const {state, dispatch, REDUCER_ACTIONS, handleProductDisplay} = useContext(ProductDisplayContext);

  return {state, dispatch, REDUCER_ACTIONS, handleProductDisplay}
}

export default ProductDisplayContext
