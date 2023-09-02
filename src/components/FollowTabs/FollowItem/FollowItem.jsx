import React from "react";
import styles from "./FollowItem.module.scss";
import IconDefaultAvatar from "../../../assets/icons/default-img.svg";
import FollowingBtn from "../../shared/shareBtn/FollowingBtn";
import FollowBtn from "../../shared/shareBtn/FollowBtn";
import { userFollow, unFollow } from "../../../api/tweets";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../../api/user";

const FollowItem = ({
  id,
  name,
  account,
  avatar,
  introduction,
  isFollowed,
  rerender,
  setRerender,
}) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  // 點擊頭像
  const handleClick = async () => {
    // 如果點選自己
    if (id === userId) {
      navigate(`/${account}`);
    } else {
      // 如果點到其他人
      localStorage.setItem("otherUserId", id);
      const otherUserInfo = await getUserInfo(id);
      const otherUserAccount = otherUserInfo.account;
      navigate(`/other/${otherUserAccount}`);
    }
  };

  // 追蹤
  const userFollowAsync = async (token, id) => {
    try {
      const res = await userFollow(token, id);
    } catch (error) {
      console.error(error);
    }
  };

  // 去銷追蹤
  const userUnfollowAsync = async (token, id) => {
    try {
      const res = await unFollow(token, id);
    } catch (error) {
      console.error(error);
    }
  };

  // 設定追蹤、取消追蹤功能
  const handleFollowClick = async (topUserId, isFollowed) => {
    if (isFollowed) {
      await userUnfollowAsync(token, topUserId);
    } else {
      await userFollowAsync(token, topUserId);
    }
    await setRerender(!rerender);
  };

  return (
    <div id={id} className={styles.container}>
      <div>
        <img
          className={styles.avatar}
          src={avatar ? avatar : IconDefaultAvatar}
          alt="avatar"
          onClick={handleClick}
        />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>
          <div className={styles.name}>{name}</div>
          <div className={styles.button}>
            {isFollowed ? (
              <FollowingBtn
                text={"正在跟隨"}
                onClick={() => handleFollowClick(id, isFollowed)}
              />
            ) : (
              <FollowBtn
                text={"跟隨"}
                onClick={() => handleFollowClick(id, isFollowed)}
              />
            )}
          </div>
        </div>
        <div className={styles.description}>{introduction}</div>
      </div>
    </div>
  );
};

export default FollowItem;
