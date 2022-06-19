import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import VisibilityIcon from "@mui/icons-material/Visibility";
import OpacityIcon from "@mui/icons-material/Opacity";
import AirIcon from "@mui/icons-material/Air";
import styles from "./Town.module.scss";
import { getCurrentHours, getCurrentTown } from "../../redux/selectors/selectors";
import { useAppStateSelector, useAppDispatch } from "../../utils/redux.utils";
import { HOME_ROUTE } from "../../consts/home.const";
import { CALVIN_TEMPERATURE } from "../../consts/tempareture.const";
import { fetchHours } from "../../redux/slices/hoursTownSlice";

const Town = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentTown = useAppStateSelector(getCurrentTown(Number(params.id)));
  const currentHours = useAppStateSelector(getCurrentHours);

  const handleBackToHome = () => navigate(HOME_ROUTE);

  const getTopPx = (temp: number) => {
    const hours = [...currentHours];
    return hours.sort((a, b) => a.temp - b.temp)[0].temp - temp;
  };

  useEffect(() => {
    dispatch(fetchHours({ lon: currentTown!.coord.lon, lat: currentTown!.coord.lat }));
  }, []);

  return (
    <>
      <Fab variant="extended" onClick={() => handleBackToHome()}>
        <NavigationIcon sx={{ mr: 1 }} />
        Back to home
      </Fab>
      <div className={styles["town-container"]}>
        <div className={styles["town-name"]}>
          Name: {currentTown?.name}, {currentTown?.sys.country}
        </div>
        <div className={styles["desc-container"]}>
          <ThermostatIcon />
          Temperature: {((currentTown?.main?.feels_like || 0) - CALVIN_TEMPERATURE).toFixed(2)} °C
        </div>
        <div className={styles["desc-container"]}>
          <CloudIcon />
          Weather: {currentTown?.weather[0].main}
        </div>
        <div className={styles["desc-container"]}>
          <CompareArrowsIcon />
          Pressure: {currentTown?.main.pressure}hPa
        </div>
        <div className={styles["desc-container"]}>
          <AirIcon />
          Wind: {currentTown?.wind.speed} m/s NNE
        </div>
        <div className={styles["desc-container"]}>
          <OpacityIcon />
          Humidity: {currentTown?.main.humidity}%
        </div>
        <div className={styles["desc-container"]}>
          <VisibilityIcon />
          Visibility: {((currentTown?.visibility ?? 1000) / 1000).toFixed(2)}km
        </div>
      </div>
      {currentHours.length && (
        <>
          <div className={styles["hours-text"]}>Change in temperature today</div>
          <div className={styles["hours-container"]}>
            {currentHours.map((hour) => (
              <div key={hour.feels_like + hour.dt} style={{ marginTop: getTopPx(hour.temp) * 5 }}>
                {hour.temp.toFixed(0)}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Town;
