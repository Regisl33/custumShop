import { useContext, useReducer, createContext, ReactElement } from "react";
import { ComputerType, useProductContext } from "./ProductContext";

const productData = useProductContext();

type DisplayContextType = {
  productData: ComputerType[];
  productDisplay: ComputerType[];
  searchResult: string;
  selectedProcess: string;
  minPriceRange: number;
};

const initDisplayContext = {
  productData: productData,
  productDisplay: productData,
  searchResult: "",
  selectedProcess: "",
  minPriceRange: 800,
};

const REDUCER_ACTIONS_TYPE = {
  getSearchResult: "getSearchResult",
  getSelectedProcess: "getSeletedProcess",
  getMidPriceRange: "getMidPriceRange",
};

type ReducerActionsType = typeof REDUCER_ACTIONS_TYPE;

type ReducerActions = {
  type: string;
  payload: string;
};

const reducer = (state: DisplayContextType, action: ReducerActions) => {};
