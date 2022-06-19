import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AlertNotification.module.scss";
import { getError } from "../../redux/selectors/selectors";
import { useAppStateSelector, useAppDispatch } from "../../utils/redux.utils";
import { clearError } from "../../redux/slices/townsSlice";

export const AlertNotification = () => {
  const dispatch = useAppDispatch();
  const error = useAppStateSelector(getError);

  const handleClearError = () => dispatch(clearError());

  return (
    <div className={styles["alert-wrapper"]}>
      <Alert severity="error">
        <div className={styles["alert-container"]}>
          {error}
          <CloseIcon className={styles["clear-icon"]} onClick={() => handleClearError()} />
        </div>
      </Alert>
    </div>
  );
};
