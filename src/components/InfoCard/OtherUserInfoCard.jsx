import { useState, useEffect } from "react";
import styles from "./OtherUserInfoCard.module.scss";
import FollowingBtn from "../shared/shareBtn/FollowingBtn";
import FollowBtn from "../shared/shareBtn/FollowBtn";
import DefaultAvatar from "../../assets/icons/default-img.svg";
import DefaultBanner from "../../assets/images/bg-user.png";
import { userFollow, unFollow } from "../../api/tweets";

export default function OtherUserInfoCard({
  info,
  rerender,
  setRerender,
  followerCount,
}) {
  const {
    id,
    name,
    account,
    introduction,
    avatar,
    banner,
    followingsNum,
    isFollowed,
  } = info;

  const token = localStorage.getItem("token");
  // 設暫存，讓畫面立即更新
  const [followedStatus, setFollowedStatus] = useState(isFollowed);
  // 設暫存，讓畫面立即更新
  const [followerCountTemp, setFollowerCountTemp] = useState(followerCount);

  // 追蹤
  const userFollowAsync = async (token, id) => {
    try {
      const res = await userFollow(token, id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // 去銷追蹤
  const userUnfollowAsync = async (token, id) => {
    try {
      const res = await unFollow(token, id);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  // 追蹤按鈕邏輯
  const handleFollowClick = async () => {
    if (followedStatus) {
      await userUnfollowAsync(token, id);
      await setFollowerCountTemp(followerCount - 1);
    } else {
      await userFollowAsync(token, id);
      await setFollowerCountTemp(followerCount + 1);
    }
    await setRerender(!rerender);
  };

  useEffect(() => {
    setFollowedStatus(isFollowed);
    setFollowerCountTemp(followerCount);
  }, [isFollowed, followerCount]);
  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          className={styles.banner}
          src={banner ? banner : DefaultBanner}
          alt="banner"
        />
        <img
          className={styles.avatar}
          src={avatar ? avatar : DefaultAvatar}
          alt="avatar"
        />
        <div className={styles.followBtn}>
          {followedStatus ? (
            <FollowingBtn
              text={"正在跟隨"}
              onClick={() => {
                setFollowedStatus(!followedStatus);
                handleFollowClick();
              }}
            />
          ) : (
            <FollowBtn
              text={"跟隨"}
              onClick={() => {
                setFollowedStatus(!followedStatus);
                handleFollowClick();
              }}
            />
          )}
        </div>
      </div>
      <div className={styles.userInfo}>
        <h5 className={styles.userName}>{name}</h5>
        <p className={styles.userAccount}>@{account}</p>
      </div>
      <div className={styles.introduction}>{introduction}</div>
      <div className={styles.showFollow}>
        <p className={styles.showfolloing}>
          {followingsNum}個<span className={styles.sub}>跟隨中</span>
        </p>
        <p className={styles.showfollowers}>
          {followerCountTemp}位<span className={styles.sub}>跟隨者</span>
        </p>
      </div>
    </div>
  );
}
