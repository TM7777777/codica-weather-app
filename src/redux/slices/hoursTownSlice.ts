import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiService } from "../../api/ApiService";
import { FetchHourPayload, IHoursTownPayload } from "../../types/fetchHourPayload";
import { IHoursTown } from "../../types/hoursTown";

export interface IHoursTownState {
  lastHoursTown: IHoursTown[];
}

const initialState: IHoursTownState = {
  lastHoursTown: [],
};

export const fetchHours = createAsyncThunk<IHoursTownPayload, FetchHourPayload>(
  "towns/fetchHours",
  async ({ lon, lat }) => {
    const { data } = await ApiService.fetchHour(lon, lat);
    return data;
  },
);

const hoursTown = createSlice({
  name: "hoursTown",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHours.fulfilled, (state, { payload }) => {
      state.lastHoursTown = payload.hourly.filter((_, ind) => ind > 23);
    });
  },
});

export const hoursTownReducer = hoursTown.reducer;
