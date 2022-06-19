export interface ITown {
  name: string;
  id: number;
  coord: {
    lon: number;
    lat: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  base: string;
  clouds: {
    all: number;
  };
  dt: number;
  main: {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: Array<{
    description: string;
    icon: string;
    id: number;
    main: string;
  }>;
  lastTimeUpdated: string;
}
