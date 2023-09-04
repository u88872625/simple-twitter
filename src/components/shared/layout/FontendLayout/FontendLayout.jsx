import styles from "./FontendLayout.module.scss";
import FontendSideBar from "../../../SideBar/FontendSideBar.jsx";
import PopularList from "../../../PopularList/PopularList";
import { useEffect, useState, useRef } from "react";

export default function FontendLayout({
  children,
  rerender,
  setRerender,
  userInfo,
}) {
  const mainContainerRef = useRef(null);
  const rightContainerRef = useRef(null);
  const [isMainAtBottom, setIsMainAtBottom] = useState(false);
  const [rightContainerLeft, setRightContainerLeft] = useState(0);

  useEffect(() => {
    const updateRightContainerPosition = () => {
      if (mainContainerRef.current) {
        const rect = mainContainerRef.current.getBoundingClientRect();
        setRightContainerLeft(rect.right + 24);
      }
    };

    const handleScroll = () => {
      const main = mainContainerRef.current;

      if (main.scrollTop + main.clientHeight >= main.scrollHeight) {
        setIsMainAtBottom(true);
      } else {
        setIsMainAtBottom(false);
      }
      updateRightContainerPosition();
    };

    const main = mainContainerRef.current;
    if (main) {
      main.addEventListener("scroll", handleScroll);
    }

    updateRightContainerPosition();
    window.addEventListener("resize", updateRightContainerPosition);

    return () => {
      if (main) {
        main.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", updateRightContainerPosition);
    };
  }, []);

  const rightContainerStyle = isMainAtBottom
    ? { position: "relative" }
    : { position: "fixed", left: `${rightContainerLeft}px` };

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <FontendSideBar userInfo={userInfo} />
      </div>
      <div ref={mainContainerRef} className={styles.mainContainer}>
        {children}
      </div>
      <div
        ref={rightContainerRef}
        className={styles.rightContainer}
        style={rightContainerStyle}
      >
        <PopularList rerender={rerender} setRerender={setRerender} />
      </div>
    </div>
  );
}
