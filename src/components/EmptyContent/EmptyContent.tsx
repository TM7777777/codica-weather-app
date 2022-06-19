import styles from "./EmptyContent.module.scss";

export const EmptyContent = () => {
  return (
    <div className={styles["container"]}>You don't have any towns yet. You can add a new one</div>
  );
};
