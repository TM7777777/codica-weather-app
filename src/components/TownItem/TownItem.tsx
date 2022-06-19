import { useRef } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CloudIcon from "@mui/icons-material/Cloud";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import LoopIcon from "@mui/icons-material/Loop";
import { useNavigate } from "react-router-dom";
import styles from "./TownItem.module.scss";
import { useAppDispatch, useAppStateSelector } from "../../utils/redux.utils";
import { fetchTownByName, removeTown } from "../../redux/slices/townsSlice";
import { FetchType } from "../../types/fetchTownByNamePayload";
import { ITown } from "../../types/town";
import { getLoadingState } from "../../redux/selectors/selectors";
import { CALVIN_TEMPERATURE } from "../../consts/tempareture.const";

type TownItemProps = ITown;

export const TownItem = ({ name, id, lastTimeUpdated, main, weather, sys }: TownItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loadingState = useAppStateSelector(getLoadingState);
  const isTownLoading = loadingState.find((town) => town.name === name);

  const removeRef = useRef<SVGSVGElement>(null);
  const updateRef = useRef<HTMLButtonElement>(null);

  const viewFullInfo = (event: React.MouseEvent) => {
    const isClickOutside =
      event.target !== removeRef.current?.children[0] &&
      event.target !== removeRef.current &&
      event.target !== updateRef.current;

    if (isClickOutside) {
      navigate(`/codica-weather-app/town/${id}/${name}`);
    }
  };

  const handleUpdate = () => dispatch(fetchTownByName({ townName: name, type: FetchType.UPDATE }));
  const handleRemove = () => dispatch(removeTown(id));

  return (
    <div className={styles["wrapper"]} onClick={viewFullInfo}>
      <div className={styles["name-container"]}>
        <div>
          Name: {name}, {sys.country}
        </div>
        <CloseIcon
          className={styles["close-icon"]}
          onClick={() => handleRemove()}
          ref={removeRef}
        />
      </div>
      <div className={styles["desc-container"]}>
        <ThermostatIcon />
        Temperature: {(main.feels_like - CALVIN_TEMPERATURE).toFixed(2)} °C
      </div>
      <div className={styles["desc-container"]}>
        <CloudIcon />
        Weather: {weather[0].main}
      </div>
      <div className={styles["desc-container"]}>
        <CompareArrowsIcon />
        Pressure: {main.pressure}hPa
      </div>
      <div>Last time updated: {lastTimeUpdated}</div>
      <Button variant="contained" onClick={() => handleUpdate()} ref={updateRef}>
        {isTownLoading && <LoopIcon />}
        Update info
      </Button>
    </div>
  );
};
