import { IHoursTown } from "./hoursTown";
import { ITown } from "./town";

export type FetchHourPayload = {
  lon: number;
  lat: number;
};

export interface IHoursTownPayload {
  city: {
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  cnt: number;
  cod: string;
  message: number;
  list: ITown[];
  hourly: IHoursTown[];
}
