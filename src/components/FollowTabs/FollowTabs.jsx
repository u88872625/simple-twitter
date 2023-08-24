import React from "react";
import styles from "./FollowTabs.module.scss";
import clsx from "clsx";
import { useState } from "react";
import FollowerContent from "./FollowerContent/FollowerContent";
import FollowingContent from "./FollowingContent/FollowingContent";

const dummyFollower = [
  {
    id: 1,
    avatar:
      "https://images.pexels.com/photos/11305141/pexels-photo-11305141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Amy",
    description: "description",
    followerId: 111,
    isFollowed: true,
  },

  {
    id: 2,
    avatar: "",
    name: "Amy",
    description: "description",
    followerId: 112,
    isFollowed: true,
  },
  {
    id: 3,
    avatar: "https://images.pexels.com/photos/814822/pexels-photo-814822.jpeg",
    name: "Amy",
    description: "",
    followerId: 113,
    isFollowed: false,
  },
];

const dummyFollowing = [
  {
    id: 4,
    avatar: "",
    name: "Amy",
    description: "description",
    following: 120,
    isFollowed: true,
  },

  {
    id: 5,
    avatar:
      "https://images.pexels.com/photos/11305141/pexels-photo-11305141.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    name: "Amy",
    description: "description",
    followring: 121,
    isFollowed: true,
  },
  {
    id: 6,
    avatar: "https://images.pexels.com/photos/814822/pexels-photo-814822.jpeg",
    name: "Amy",
    description: "description",
    following: 122,
    isFollowed: true,
  },
];

const FollowTabs = () => {
  const [followMode, setFollowMode] = useState("follower");

  function handleChangeMode(mode) {
    setFollowMode(mode);
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <button
          className={clsx({
            [styles.buttonActive]: followMode === "follower",
            [styles.button]: followMode !== "follower",
          })}
          onClick={() => handleChangeMode("follower")}
        >
          追隨者
        </button>
        <button
          className={clsx({
            [styles.buttonActive]: followMode === "following",
            [styles.button]: followMode !== "following",
          })}
          onClick={() => handleChangeMode("following")}
        >
          正在追隨
        </button>
      </div>
      <div className={styles.contentwrapper}>
        {followMode === "follower" && (
          <FollowerContent followers={dummyFollower} />
        )}
        {followMode === "following" && (
          <FollowingContent followings={dummyFollowing} />
        )}
      </div>
    </div>
  );
};

export default FollowTabs;
