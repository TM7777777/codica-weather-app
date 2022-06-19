import { useDispatch, useSelector } from "react-redux";
import { store } from "../redux/store";

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppStateSelector = <TSelected = unknown>(
  selector: (state: AppState) => TSelected,
): TSelected => useSelector(selector);