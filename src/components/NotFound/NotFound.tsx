import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <div className={styles["root"]}>
      <h1>
        <span>😕</span>
        <br />
        That page doesn't exist!
      </h1>
      <p className={styles["description"]}>
        Sorry, the page you were looking for could not be found.
      </p>
    </div>
  );
};
