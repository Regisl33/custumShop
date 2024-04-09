import { ChangeEvent } from "react";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const PriceRange = () => {
  const { state, dispatch, REDUCER_ACTIONS } = useProductDisplayContext();
  //Input Range for Price HTML Return
  const content = (
    <li aria-label="Price-Range-Selector">
      <label
        className="offscreen"
        htmlFor="priceRange"
      >
        Price Range Input
      </label>
      <input
        type="range"
        id="priceRange"
        min={0}
        max={4000}
        step={100}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: REDUCER_ACTIONS.getMidPriceRange,
            payload: e.target.value,
          })
        }
        value={state.minPriceRange}
      />
      <span className="radio-span">{state.minPriceRange}</span>
    </li>
  );
  return content;
};

export default PriceRange;
