import axios from "axios";
import { IHoursTownPayload } from "../types/fetchHourPayload";
import { ITown } from "../types/town";

const API_KEY = "7414839101557616c5c1c483c3cb7ed7";
const API_KEY_FOR_HOURS = "439d4b804bc8187953eb36d2a8c26a02";

export class ApiService {
  static fetchByName = (townName: string) =>
    axios.get<ITown>(
      `https://api.openweathermap.org/data/2.5/weather?q=${townName}&appid=${API_KEY}`,
    );

  static fetchHour = (lon: number, lat: number) =>
    axios.get<IHoursTownPayload>(
        // `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`,
      `https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY_FOR_HOURS}`,
    );
}
