import { ITown } from "../../types/town";
import { AppState } from "../../utils/redux.utils";

export const getTowns = (state: AppState) => state.townsReducer.towns;
export const getError = (state: AppState) => state.townsReducer.error;
export const getLoadingState = (state: AppState) => state.townsReducer.loadingTowns;
export const getCurrentTown =
  (id: number) =>
  (state: AppState): ITown | undefined =>
    state.townsReducer.towns.find((town) => town.id === id);
export const getCurrentHours = (state: AppState) => state.hoursTownReducer.lastHoursTown;
