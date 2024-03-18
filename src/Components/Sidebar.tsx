import { ChangeEvent } from "react";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const Sidebar = () => {
  const { state, dispatch, REDUCER_ACTIONS } = useProductDisplayContext();

  const content = (
    <div className="sidebar">
      <div className="hamburger-menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <nav aria-label="Sidebar Shop Nav">
        <ul className="sidebar-nav">
          <li aria-label="Search-Bar">
            <label className="offscreen" htmlFor="search">
              Search-Bar
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTIONS.getSearchResult,
                  payload: e.target.value,
                })
              }
              value={state.searchResult}
            />
          </li>
          <li aria-label="Price-Range-Selector">
            <label className="offscreen" htmlFor="priceRange">
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
            <span>{state.minPriceRange}</span>
          </li>
          <li aria-label="Processor-Checkbox">
            <label htmlFor="amd">Amd</label>
            <input
              type="radio"
              id="amd"
              name="process"
              defaultChecked={state.selectedProcess === "amd" ? true : false}
              onClick={(e: any) =>
                dispatch({
                  type: REDUCER_ACTIONS.getSelectedProcess,
                  payload: e.target.id,
                })
              }
            />
            <label htmlFor="intel">Intel</label>
            <input
              type="radio"
              id="intel"
              name="process"
              defaultChecked={state.selectedProcess === "intel" ? true : false}
              onClick={(e: any) =>
                dispatch({
                  type: REDUCER_ACTIONS.getSelectedProcess,
                  payload: e.target.id,
                })
              }
            />
          </li>
        </ul>
      </nav>
    </div>
  );
  return content;
};

export default Sidebar;
