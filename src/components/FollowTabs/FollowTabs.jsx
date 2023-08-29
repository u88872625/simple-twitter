import React from "react";
import styles from "./FollowTabs.module.scss";
import clsx from "clsx";
import { useState } from "react";
import FollowerContent from "./FollowerContent/FollowerContent";
import FollowingContent from "./FollowingContent/FollowingContent";

const FollowTabs = ({ followers, followings, rerender, setRerender }) => {
  const [followMode, setFollowMode] = useState("followers");

  function handleChangeMode(mode) {
    setFollowMode(mode);
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button
          className={clsx({
            [styles.buttonActive]: followMode === "followers",
            [styles.button]: followMode !== "followers",
          })}
          onClick={() => handleChangeMode("followers")}
        >
          追隨者
        </button>
        <button
          className={clsx({
            [styles.buttonActive]: followMode === "followings",
            [styles.button]: followMode !== "followings",
          })}
          onClick={() => handleChangeMode("followings")}
        >
          正在追隨
        </button>
      </div>
      <div className={styles.contentwrapper}>
        {followMode === "followers" && (
          <FollowerContent
            followers={followers}
            rerender={rerender}
            setRerender={setRerender}
          />
        )}
        {followMode === "followings" && (
          <FollowingContent
            followings={followings}
            rerender={rerender}
            setRerender={setRerender}
          />
        )}
      </div>
    </div>
  );
};

export default FollowTabs;
