import styles from "./FontendLayout.module.scss";
import FontendSideBar from "../../../SideBar/FontendSideBar.jsx";
import PopularList from "../../../PopularList/PopularList";
import { useState } from "react";

export default function FontendLayout({ children, rerender, setRerender }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <FontendSideBar />
      </div>
      <div className={styles.mainContainer}>{children}</div>
      <div className={styles.rightContainer}>
        <PopularList rerender={rerender} setRerender={setRerender} />
      </div>
    </div>
  );
}
