import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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
  handleFollowDetail,
}) {
  const {
    id,
    name,
    account,
    introduction,
    avatar,
    banner,
    followingsNum,
    followersNum,
    isFollowed,
  } = info;

  const token = localStorage.getItem("token");
  // 設暫存，讓畫面立即更新
  const [followedStatus, setFollowedStatus] = useState(isFollowed);
  // 設暫存，讓畫面立即更新
  const [followerCountTemp, setFollowerCountTemp] = useState(followerCount);
  const navigate = useNavigate();
  const [followerNumTemp, setFollowerNumTemp] = useState(followersNum);

   const [showMore, setShowMore] = useState(false);
   const maxChars = 70;
   // 如果文字長度超過 maxChars，則將其截斷並提供 "查看更多" 功能
    const truncatedText = showMore
      ? introduction
      : introduction.slice(0, maxChars);
  
   

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
      setFollowerNumTemp((prevFollowerNum) => prevFollowerNum - 1);
      setFollowedStatus(false);
    } else {
      await userFollowAsync(token, id);
      setFollowedStatus(true);
      setFollowerNumTemp(followersNum + 1);
      // console.log(info);
    }
    await setRerender(!rerender);
  };

  useEffect(() => {
    setFollowedStatus(isFollowed);
    setFollowerNumTemp(followersNum);
  }, [followersNum, isFollowed]);
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
      <div className={styles.introduction}>
        <p>{truncatedText}</p>
        {introduction.length > maxChars && !showMore && (
          <button className={styles.viewMore} onClick={() => setShowMore(true)}>
            查看更多
          </button>
        )}
      </div>
      <div className={styles.showFollow} onClick={handleFollowDetail}>
        <p className={styles.showfolloing}>
          {followingsNum}個<span className={styles.sub}>跟隨中</span>
        </p>
        <p className={styles.showfollowers}>
          {followerNumTemp}位<span className={styles.sub}>跟隨者</span>
        </p>
      </div>
    </div>
  );
}
