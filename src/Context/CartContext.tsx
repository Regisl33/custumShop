import {
  useContext,
  useReducer,
  createContext,
  ReactElement,
  useMemo,
} from "react";
import { ComputerType } from "./ProductContext";

type CartStateType = {
  cart: ComputerType[];
};
const initCartState: CartStateType = {
  cart: [],
};

const REDUCER_ACTIONS_TYPE = {
  add: "add",
  remove: "remove",
  delete: "delete",
  clear: "clear",
};

export const cartReducerActionsType = typeof REDUCER_ACTIONS_TYPE;

type ReducerActions = {
  type: string;
  payload: ComputerType;
};

const reducer = (
  state: CartStateType,
  action: ReducerActions
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTIONS_TYPE.add:
      const otherProductsAdd = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );

      let addedProduct: ComputerType | undefined;

      state.cart.map((prod) =>
        prod.sku === action.payload.sku ? (addedProduct = prod) : null
      );

      const newArrayAdd = addedProduct
        ? [...otherProductsAdd, { ...addedProduct, qty: addedProduct.qty + 1 }]
        : [...otherProductsAdd, { ...action.payload, qty: 1 }];

      return { ...state, cart: newArrayAdd };

    case REDUCER_ACTIONS_TYPE.remove:
      const otherProducts = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );

      let removedProduct: ComputerType | undefined;

      state.cart.map((prod) =>
        prod.sku === action.payload.sku ? (removedProduct = prod) : null
      );

      const newArray = !removedProduct
        ? otherProducts
        : removedProduct.qty !== 1
        ? [...otherProducts, { ...removedProduct, qty: removedProduct.qty - 1 }]
        : otherProducts;

      return { ...state, cart: newArray };

    case REDUCER_ACTIONS_TYPE.delete:
      const otherProductsDel = state.cart.filter(
        (prod) => prod.sku !== action.payload.sku
      );

      return { ...state, cart: otherProductsDel };

    case REDUCER_ACTIONS_TYPE.clear:
      return { ...state, cart: [] };

    default:
      throw new Error("action type undefined in Cart Context");
  }
};

const useCartContext = (initCartContext: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartContext);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTIONS_TYPE;
  }, []);

  const reduceFunction = (total: number, value: number) => {
    return total + value;
  };

  const CartTotalPrice =
    state.cart.length !== 0
      ? state.cart.map((prod) => prod.qty * prod.price).reduce(reduceFunction)
      : 0;

  return { state, dispatch, REDUCER_ACTIONS, CartTotalPrice };
};

export type useCartContextType = ReturnType<typeof useCartContext>;

const initCartContext: useCartContextType = {
  state: initCartState,
  dispatch: () => {},
  REDUCER_ACTIONS: REDUCER_ACTIONS_TYPE,
  CartTotalPrice: 0,
};

const CartContext = createContext<useCartContextType>(initCartContext);

type ChildrenType = { children: ReactElement | ReactElement[] };

export const CartContextProvider = ({
  children,
}: ChildrenType): ReactElement => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContextState = () => {
  const { state, dispatch, REDUCER_ACTIONS, CartTotalPrice } =
    useContext(CartContext);

  return { state, dispatch, REDUCER_ACTIONS, CartTotalPrice };
};

export default CartContext;
