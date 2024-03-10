import { ChangeEvent } from "react";
import { displayViews } from "../App";
import { FaCartShopping } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { useProductDisplayContext } from "../Context/ProductDisplayContext";

type PropsType = {
  activeDisplay: displayViews;
  setActiveDisplay: React.Dispatch<React.SetStateAction<displayViews>>;
};

const Navigation = ({ activeDisplay, setActiveDisplay }: PropsType) => {

  const {state, dispatch, REDUCER_ACTIONS} = useProductDisplayContext();

  const pageContent =
  activeDisplay === "cart" ? (
    <button onClick={() => setActiveDisplay("shop")}>
      <FaHome />
    </button>
  ) : (
    <button onClick={() => setActiveDisplay("cart")}>
      <FaCartShopping />
    </button>
  );

  const content = (
  <nav aria-label="Main Shop Nav">
    <ul>
      <li aria-label="Search-Bar">
        <label className="offscreen" htmlFor="search">
          Search-Bar
        </label>
        <input 
          type="text" 
          id="search" 
          placeholder="Search" 
          onChange={(e:ChangeEvent<HTMLInputElement>) => dispatch( {type: REDUCER_ACTIONS.getSearchResult, payload: e.target.value})} 
          value={state.searchResult}/>
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
          onChange={(e:ChangeEvent<HTMLInputElement>) => dispatch({type: REDUCER_ACTIONS.getMidPriceRange, payload: e.target.value})} 
          value={state.minPriceRange}/>
        <span>{state.minPriceRange}</span>
      </li>
      <li aria-label="Processor-Checkbox">
        <label htmlFor="amd">Amd</label>
        <input 
          type="radio" 
          id="amd" 
          name="process" 
          checked={state.selectedProcess === "amd" ? true : false} 
          onClick={(e:any) => dispatch({type: REDUCER_ACTIONS.getSelectedProcess, payload: e.target.id})}/>
        <label htmlFor="intel">Intel</label>
        <input 
          type="radio" 
          id="intel" 
          name="process" 
          checked={state.selectedProcess === "intel" ? true : false} 
          onClick={(e:any) => dispatch({type: REDUCER_ACTIONS.getSelectedProcess, payload: e.target.id})}/>
      </li>
      <li aria-label="Cart-Button">{pageContent}</li>
    </ul>
  </nav>
  );

  return content
};

export default Navigation;