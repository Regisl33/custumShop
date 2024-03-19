import { ChangeEvent } from "react";
import { displayViews } from "../App";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";
import ThemeToggle from "./ThemeToggle";
import { Themes } from "../App";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
  theme: Themes;
  setTheme: React.Dispatch<React.SetStateAction<Themes>>;
};

const Navigation = ({
  activeDisplay,
  setActiveDisplay,
  theme,
  setTheme,
}: PropsType) => {
  const { state, dispatch, REDUCER_ACTIONS } = useProductDisplayContext();

  const pageContent =
    activeDisplay === "cart" ? (
      <button
        className={theme === "dark" ? "span-dark" : "span-light"}
        onClick={() => setActiveDisplay("shop")}
      >
        <FaHome />
      </button>
    ) : (
      <button
        className={theme === "dark" ? "span-dark" : "span-light"}
        onClick={() => setActiveDisplay("cart")}
      >
        <FaCartShopping />
      </button>
    );

  const content = (
    <nav style={{background: theme === "dark" ? "#0f0fe2" : "#0f71f0", color: theme === "dark" ? "#f3f3f3" : "#090909"}} className="navigation" aria-label="Main Shop Nav">
      <ul className="main-nav">
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
      <div aria-label="Cart-Button">{pageContent}</div>
      <div aria-label="Theme-Toggle">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
    </nav>
  );

  return content;
};

export default Navigation;
