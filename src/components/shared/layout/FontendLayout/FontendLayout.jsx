import styles from "./FontendLayout.module.scss";
import FontendSideBar from "../../../SideBar/FontendSideBar.jsx";
import PopularList from "../../../PopularList/PopularList";
import { useEffect, useState } from "react";

export default function FontendLayout({
  children,
  rerender,
  setRerender,
  userInfo,
}) {
  const [rightContainerLeft, setRightContainerLeft] = useState(0);

  useEffect(() => {
    const updateRightContainerPosition = () => {
      const mainContainer = document.querySelector(`.${styles.mainContainer}`);
      const rightContainer = document.querySelector(
        `.${styles.rightContainer}`
      );
      if (mainContainer && rightContainer) {
        const rect = mainContainer.getBoundingClientRect();
        setRightContainerLeft(rect.right + 24); // 24 是 .mainContainer 的 margin-right
      }
    };

    // 初始設置
    updateRightContainerPosition();

    // 監聽 resize 事件
    window.addEventListener("resize", updateRightContainerPosition);

    // 清除事件監聽
    return () => {
      window.removeEventListener("resize", updateRightContainerPosition);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <FontendSideBar userInfo={userInfo} />
      </div>
      <div className={styles.mainContainer}>{children}</div>
      <div
        className={styles.rightContainer}
        style={{ left: `${rightContainerLeft}px` }}
      >
        <PopularList rerender={rerender} setRerender={setRerender} />
      </div>
    </div>
  );
}
