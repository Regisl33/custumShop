import {
  useContext,
  useReducer,
  createContext,
  ReactElement,
  useMemo,
} from "react";
import { ComputerType } from "./ProductContext";
//Type of the State
type CartStateType = {
  cart: ComputerType[];
};
//Default Value of the State
const initCartState: CartStateType = {
  cart: [],
};
//Actions for the reducer
const REDUCER_ACTIONS_TYPE = {
  add: "add",
  remove: "remove",
  delete: "delete",
  clear: "clear",
};
//Type of the reducer Actions
export const cartReducerActionsType = typeof REDUCER_ACTIONS_TYPE;
//Type of action
type ReducerActions = {
  type: string;
  payload: ComputerType;
};
//State Reducer
const reducer = (
  state: CartStateType,
  action: ReducerActions
): CartStateType => {
  switch (action.type) {
    //Adding a product to the cart Logic
    case REDUCER_ACTIONS_TYPE.add:
      //Identify all the other products that were in the cart
      const otherProductsAdd = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );
      //Check if the product we are adding is already in the cart
      let addedProduct: ComputerType | undefined;

      state.cart.map((prod) =>
        prod.sku === action.payload.sku ? (addedProduct = prod) : null
      );
      //Return the cart with the other products and incrementing the quantity of the item we were adding if it was in the cart, if not adding it.
      const newArrayAdd = addedProduct
        ? [...otherProductsAdd, { ...addedProduct, qty: addedProduct.qty + 1 }]
        : [...otherProductsAdd, { ...action.payload, qty: 1 }];

      return { ...state, cart: newArrayAdd };
    //Remove 1 product from the cart Logic
    case REDUCER_ACTIONS_TYPE.remove:
      //Identify all the other products that were in the cart
      const otherProducts = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );
      //Identify the product we are removing
      let removedProduct: ComputerType | undefined;

      state.cart.map((prod) =>
        prod.sku === action.payload.sku ? (removedProduct = prod) : null
      );
      //Return the cart with the other products and checks if the product we are removing as a quantity greater than 1 if so decrease it from 1, if not remove completly the product. Also deals with error with removing a product that wouldn't be in the cart somehow.
      const newArray = !removedProduct
        ? otherProducts
        : removedProduct.qty !== 1
        ? [...otherProducts, { ...removedProduct, qty: removedProduct.qty - 1 }]
        : otherProducts;

      return { ...state, cart: newArray };
    //Delete a product from the cart Logic
    case REDUCER_ACTIONS_TYPE.delete:
      const otherProductsDel = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );
      //Return only the products that weren't selected
      return { ...state, cart: otherProductsDel };
    //Clear the cart Logic
    case REDUCER_ACTIONS_TYPE.clear:
      //Return empty State cart
      return { ...state, cart: [] };
    //Default Error
    default:
      throw new Error("action type undefined in Cart Context");
  }
};
//Custom Hook that will be used as the Context Value
const useCartContext = (initCartContext: CartStateType) => {
  //State and Dispatch from the reducer
  const [state, dispatch] = useReducer(reducer, initCartContext);
  //Memoized Reducer Actions
  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTIONS_TYPE;
  }, []);
  //Logic to get the total cart Price with a reducer Function
  const reduceFunction = (total: number, value: number) => {
    return total + value;
  };

  const CartTotalPrice =
    state.cart.length !== 0
      ? state.cart.map((prod) => prod.qty * prod.price).reduce(reduceFunction)
      : 0;
  //Custom Hook Return
  return { state, dispatch, REDUCER_ACTIONS, CartTotalPrice };
};
//Type of the Context
export type useCartContextType = ReturnType<typeof useCartContext>;
//Default Value of the Context
const initCartContext: useCartContextType = {
  state: initCartState,
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
  CartTotalPrice: 0,
};
//Create Context
const CartContext = createContext<useCartContextType>(initCartContext);
//Children Type
type ChildrenType = { children: ReactElement | ReactElement[] };
//Context Provider
export const CartContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};
//Custom Hook to acces all the Context infos
export const useCartContextState = () => {
  const { state, dispatch, REDUCER_ACTIONS, CartTotalPrice } =
    useContext(CartContext);

  return { state, dispatch, REDUCER_ACTIONS, CartTotalPrice };
};

export default CartContext;
