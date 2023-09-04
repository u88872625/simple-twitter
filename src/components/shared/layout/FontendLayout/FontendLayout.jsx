import styles from "./FontendLayout.module.scss";
import FontendSideBar from "../../../SideBar/FontendSideBar.jsx";
import PopularList from "../../../PopularList/PopularList";
// import { userInfo } from "os";

export default function FontendLayout({
  children,
  rerender,
  setRerender,
  userInfo,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <FontendSideBar userInfo={userInfo} />
      </div>
      <div className={styles.mainContainer}>{children}</div>
      <div className={styles.rightContainer}>
        <PopularList rerender={rerender} setRerender={setRerender} />
      </div>
    </div>
  );
}
