import { useEffect } from "react";
import { getError, getTowns } from "../../redux/selectors/selectors";
import { useAppStateSelector, useAppDispatch } from "../../utils/redux.utils";
import { AlertNotification } from "../AlertNotification/AlertNotification";
import { EmptyContent } from "../EmptyContent/EmptyContent";
import { Input } from "../Input/Input";
import { TownItem } from "../TownItem/TownItem";
import styles from "./Home.module.scss";
import { fetchTownByName } from "../../redux/slices/townsSlice";
import { FetchType } from "../../types/fetchTownByNamePayload";

const Home = () => {
  const dispatch = useAppDispatch();
  const towns = useAppStateSelector(getTowns);
  const error = useAppStateSelector(getError);

  useEffect(() => {
    if (towns.length) {
      towns.forEach((town) =>
        dispatch(fetchTownByName({ townName: town.name, type: FetchType.UPDATE })),
      );
    }
  }, []);

  return (
    <div className={styles["home-container"]}>
      <Input />
      {error && <AlertNotification />}
      {!towns.length && <EmptyContent />}
      {towns.length && (
        <div className={styles["towns-container"]}>
          {towns.map((town) => (
            <TownItem key={town.id} {...town} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
