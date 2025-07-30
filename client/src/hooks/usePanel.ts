import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../state/store";
import { closePanel } from "../state/resultPanelSlice";

export const usePanel = () => {
  const dispatch = useDispatch<AppDispatch>();

  const isOn = useSelector((state: RootState) => state.panel.isOn);
  const title = useSelector((state: RootState) => state.panel.title);
  const close = () => dispatch(closePanel());

  const indices = useSelector((state: RootState) => state.panel.indices);
  const results = useSelector((state: RootState) => state.data.searchResults);

  const zeroBasedIndices = indices.map((index) => index - 1);
  const filteredResults =
    results?.filter((_, index) => zeroBasedIndices.includes(index)) ?? [];

  return { isOn, title, close, filteredResults };
};
