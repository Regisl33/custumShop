import { ChangeEvent } from "react";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import { Themes } from "../App";

type PropsType = {
  theme: Themes;
};

const Sidebar = ({theme}:PropsType) => {
  const { state, dispatch, REDUCER_ACTIONS } = useProductDisplayContext();

  const classToggle = () =>{
    const spans = document.querySelectorAll(".spans") as NodeListOf<HTMLSpanElement>;
    const sidebar = document.querySelector(".sidebar") as HTMLDivElement;
    spans.forEach((span) => span.classList.toggle("active"))
    sidebar.classList.toggle("active")
  }
  
  const hamburgerMenu = (
    <div onClick={() => classToggle()} className="hamburger-menu">
      <span className="spans"></span>
      <span className="spans"></span>
      <span className="spans"></span>
    </div>
  )
  const content = (
    <div style={{background: theme === "dark" ? "#0f0fe2" : "#0072fe", color: theme === "dark" ? "#f3f3f3" : "#090909"}} className="sidebar">
      {hamburgerMenu}
      <nav className="sidebar-nav" aria-label="Sidebar Shop Nav">
        <ul>
          <li aria-label="Search-Bar">
            <label className="offscreen" htmlFor="search">
              Search-Bar
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
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
              checked={state.selectedProcess === "amd" ? true : false}
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
              checked={state.selectedProcess === "intel" ? true : false}
              onClick={(e: any) =>
                dispatch({
                  type: REDUCER_ACTIONS.getSelectedProcess,
                  payload: e.target.id,
                })
              }
            />
          </li>
          <li>
            <label htmlFor="sort-select">Sort By:</label>
            <select  onChange={(e:any)=> dispatch({type: REDUCER_ACTIONS.getSelectedSort, payload: e.target.value}) } name="sort-select" id="sort-select">
              <option value="A">Lowest Price</option>
              <option value="B">Highest Price</option>
              <option value="C">Alphabetical</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  );
  return content;
};

export default Sidebar;
