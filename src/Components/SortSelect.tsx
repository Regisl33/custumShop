import { ChangeEvent } from "react";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const SortSelect = () => {
  //Getting Context
  const { dispatch, REDUCER_ACTIONS, theme } = useProductDisplayContext();
  //Sort Select HTML Return
  const content = (
    <li>
      <label htmlFor="sort-select">Sort By:</label>
      <select
        className={theme === "dark" ? "select-dark" : "select-light"}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          dispatch({
            type: REDUCER_ACTIONS.getSelectedSort,
            payload: e.target.value,
          })
        }
        name="sort-select"
        id="sort-select"
      >
        <option value="A">Lowest Price</option>
        <option value="B">Highest Price</option>
        <option value="C">Alphabetical</option>
      </select>
    </li>
  );
  return content;
};

export default SortSelect;
