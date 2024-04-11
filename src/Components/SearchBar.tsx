import { ChangeEvent } from "react";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const SearchBar = () => {
  //Getting Context
  const { state, dispatch, REDUCER_ACTIONS, theme } =
    useProductDisplayContext();
  //Search Input HTML Return
  const content = (
    <li aria-label="Search-Bar">
      <label
        className="offscreen"
        htmlFor="search"
      >
        Search-Bar
      </label>
      <input
        type="text"
        id="search"
        placeholder="Search"
        autoComplete="off"
        className={theme === "dark" ? "input-dark" : "input-light"}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          dispatch({
            type: REDUCER_ACTIONS.getSearchResult,
            payload: e.target.value,
          })
        }
        value={state.searchResult}
      />
    </li>
  );
  return content;
};

export default SearchBar;
