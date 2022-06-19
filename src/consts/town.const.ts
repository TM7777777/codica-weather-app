import { IHoursTownState } from "../redux/slices/hoursTownSlice";

export const TOWN_ROUTE = "/town/:id/:name";
export const TOWNS_LOCAL_STORAGE_KEY = "towns";

export const initialHoursTestState: IHoursTownState = {
  lastHoursTown: [
    {
      dt: 1655632800,
      temp: 17.01,
      feels_like: 16.15,
      pressure: 1016,
      humidity: 53,
      dew_point: 7.37,
      uvi: 4.65,
      clouds: 100,
      visibility: 10000,
      wind_speed: 4.37,
      wind_deg: 14,
      wind_gust: 5.61,
      pop: 0,
    },
  ],
};
