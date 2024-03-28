import { useProductDisplayContext } from "../Context/ProductDisplayContext";

const CPUCheck = () => {
  const { state, dispatch, REDUCER_ACTIONS } = useProductDisplayContext();
  //CPU Checkbox HTML Return
  const content = (
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
  );
  return content;
};

export default CPUCheck;
