import { useState } from "react";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { fetchTownByName } from "../../redux/slices/townsSlice";
import { useAppDispatch } from "../../utils/redux.utils";
import { FetchType } from "../../types/fetchTownByNamePayload";
import styles from "./Input.module.scss";

export const Input = () => {
  const dispatch = useAppDispatch();
  const [townName, setTownName] = useState<string>("");

  const handleChangeInput = (event: React.SyntheticEvent<Element, Event>) => {
    setTownName((event.target as HTMLInputElement).value);
  };

  const handleClick = () => dispatch(fetchTownByName({ townName, type: FetchType.ADD }));

  return (
    <div className={styles["container"]}>
      <TextField
        id="outlined-basic"
        data-testid="input-test"
        label="Town"
        variant="outlined"
        value={townName}
        onChange={handleChangeInput}
      />
      <div className={styles["add-button"]} onClick={() => handleClick()}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
        <span>Find and add a town</span>
      </div>
    </div>
  );
};
