import styles from "./FontendLayout.module.scss";
import FontendSideBar from "../../SideBar/FontendSideBar.jsx";

export default function FontendLayout({children}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <FontendSideBar />
      </div>
      <div className={styles.mainContainer}>{children}</div>
      <div className={styles.rightContainer}>{children}</div>
    </div>
  );
}
