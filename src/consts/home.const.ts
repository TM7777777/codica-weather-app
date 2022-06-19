import { ITownsState } from "../redux/slices/townsSlice";

export const HOME_ROUTE = "/";

export const initialTestState: ITownsState = {
  error: "",
  loadingTowns: [],
  towns: [
    {
      coord: {
        lon: 30.5167,
        lat: 50.4333,
      },
      weather: [
        {
          id: 800,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      base: "stations",
      main: {
        temp: 297.38,
        feels_like: 297.11,
        temp_min: 297.38,
        temp_max: 297.38,
        pressure: 989,
        humidity: 48,
        sea_level: 20,
        grnd_level: 20,
      },
      visibility: 10000,
      wind: {
        speed: 3.44,
        deg: 251,
        gust: 4.08,
      },
      clouds: {
        all: 1,
      },
      dt: 1655625978,
      sys: {
        country: "UA",
        sunrise: 1655603161,
        sunset: 1655662346,
      },
      timezone: 10800,
      id: 703448,
      name: "Kyiv",
      lastTimeUpdated: "19.06.2022, 11:13:23",
    },
  ],
};
