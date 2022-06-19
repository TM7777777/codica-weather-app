import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ApiService } from "../../api/ApiService";
import { TOWNS_LOCAL_STORAGE_KEY } from "../../consts/town.const";
import {
  FetchTownByNameParams,
  FetchTownByNamePayload,
  FetchType,
} from "../../types/fetchTownByNamePayload";
import { ITown } from "../../types/town";
import { getFromLocalStorage, loadToLocalStorage } from "../../utils/localstorage";

interface IPayloadError {
  cod: string;
  message: string;
}

export interface ITownsState {
  towns: ITown[];
  loadingTowns: { name: string }[];
  error?: string;
}

const initialState: ITownsState = {
  towns: getFromLocalStorage(TOWNS_LOCAL_STORAGE_KEY) || [],
  loadingTowns: [],
  error: "",
};

export const fetchTownByName = createAsyncThunk<FetchTownByNamePayload, FetchTownByNameParams>(
  "towns/fetchTownByName",
  async ({ townName, type }, thunkApi) => {
    try {
      const { data } = await ApiService.fetchByName(townName);
      return { data, type };
    } catch (err) {
      const error = err as AxiosError<IPayloadError>;
      return thunkApi.rejectWithValue(error.response?.data);
    }
  },
);

const townSlice = createSlice({
  name: "towns",
  initialState,
  reducers: {
    removeTown(state, { payload }: PayloadAction<number>) {
      const filteredArr = state.towns.filter((town) => town.id !== payload);
      loadToLocalStorage(TOWNS_LOCAL_STORAGE_KEY, filteredArr);
      state.towns = filteredArr;
    },
    clearError(state) {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTownByName.fulfilled, (state, { payload }) => {
      const isTownExist =
        state.towns.length &&
        state.towns.find((town) => town.id === payload.data.id) &&
        payload.type === FetchType.ADD;
        
      if (isTownExist) {
        state.error = `${payload.data.name} is aleady on this list`;
      } else {
        if (payload.type === FetchType.ADD) {
          const newTown = { ...payload.data, lastTimeUpdated: new Date().toLocaleString() };
          loadToLocalStorage(TOWNS_LOCAL_STORAGE_KEY, [...state.towns, newTown]);
          state.loadingTowns = state.loadingTowns.filter((town) => town.name !== payload.data.name);
          state.error = "";
          state.towns.push(newTown);
        } else if (payload.type === FetchType.UPDATE) {
          const updatedArr = state.towns.map((town) =>
            town.id === payload.data.id
              ? { ...payload.data, lastTimeUpdated: new Date().toLocaleString() }
              : town,
          );
          loadToLocalStorage(TOWNS_LOCAL_STORAGE_KEY, updatedArr);
          state.loadingTowns = state.loadingTowns.filter((town) => town.name !== payload.data.name);
          state.towns = updatedArr;
        }
      }
    });
    builder.addCase(fetchTownByName.pending, (state, action) => {
      state.loadingTowns.push({ name: action.meta.arg.townName });
    });
    builder.addCase(fetchTownByName.rejected, (state, action) => {
      state.loadingTowns = state.loadingTowns.filter(
        (town) => town.name !== action.meta.arg.townName,
      );
      state.error = (action.payload as IPayloadError).message;
    });
  },
});

export const { removeTown, clearError } = townSlice.actions;
export const townsReducer = townSlice.reducer;
