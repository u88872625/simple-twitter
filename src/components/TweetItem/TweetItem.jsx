import styles from "./TweetItem.module.scss";
import replyIcon from "../../assets/icons/reply.svg";
import likeIcon from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import defaultAvatar from "../../assets/icons/default-img.svg";
import { useState, useEffect } from "react";
import ReplyModal from "../Modal/ReplyModal/ReplyModal";
import { useAuth } from "../../contexts/AuthContext";
import Alert from "../shared/Alert/Alert";
import warning from "../../assets/icons/warning.png";
import clsx from "clsx";
import { getUserInfo, addLike, unLike } from "../../api/user";
import { useNavigate } from "react-router-dom";

export default function TweetItem({
  tweet,
  onTweetClick,
  onLikeClick,
  userAvatar,
}) {
  let { name, account, avatar } = tweet.User;
  const { id, UserId, description, repliesNum, likesNum, isLiked, fromNow } =
    tweet;
  const { replyTweet, setIsReplyUpdated, currentUser } = useAuth();
  const [show, setShow] = useState();
  const [reply, setReply] = useState("");
  const [replyCount, setReplyCount] = useState(repliesNum);
  const [likeCount, setLikeCount] = useState(likesNum);
  const [like, setLike] = useState(isLiked);
  const [showFlseAlert, setShowFlseAlert] = useState(false);
  const [likeInProgress, setLikeInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [showOverLetterAlert, setShowOverLetteAlert] = useState(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const navigate = useNavigate();
  const contentDelete = () => {
    setReply("");
  };
  //  show Modal
  const handleClose = () => setShow(false);
  const handleReplyClick = () => {
    setShow(true);
  };
  // 點擊頭像
  const handleClick = async () => {
    // 如果點選自己
    if (UserId === userId) {
      navigate(`/${account}`);
    } else {
      // 如果點到其他人
      localStorage.setItem("otherUserId", UserId);
      const otherUserInfo = await getUserInfo(UserId);
      const otherUserAccount = otherUserInfo.account;
      navigate(`/other/${otherUserAccount}`);
    }
  };
  // 回覆功能
  const handleReply = async () => {
    if (reply.length > 140) {
      setShowOverLetteAlert(true);
      return;
    }
    if (reply.trim().length === 0) {
      setShowEmptyAlert(true);
      return;
    }
    const response = await replyTweet(id, { comment: reply });
    //若新增回覆成功
    if (response.data.comment) {
      handleClose();
      contentDelete();
      setReplyCount(replyCount + 1);
      // // 畫面自動重新整理
      window.location.reload();
      return;
    } else {
      contentDelete();
      handleClose();
      setShowFlseAlert(true);
    }
  };
  // 追蹤哪個貼文被按讚
  const handleLikeClick = async () => {
    if (likeInProgress) {
      return;
    }
    try {
      setLikeInProgress(true);
      if (like === true) {
        setLike(false);
        const { isLiked: resIsLiked, likesNum: resLikesNum } = await unLike(
          id,
          token
        );
        setLike(resIsLiked);
        setLikeCount(resLikesNum);
        if (onLikeClick) {
          onLikeClick(id);
        }
      } else {
        setLike(true);
        const { isLiked: resIsLiked, likesNum: resLikesNum } = await addLike(
          id,
          token
        );
        setLike(resIsLiked);
        setLikeCount(resLikesNum);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLikeInProgress(false);
    }
  };

  useEffect(() => {
    setIsReplyUpdated(false);
  }, [setIsReplyUpdated]);
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {avatar ? (
          <img
            className={styles.avatar}
            src={avatar}
            alt="avatar"
            onClick={handleClick}
          />
        ) : (
          <img
            className={styles.avatar}
            src={defaultAvatar}
            alt="defalt-avatar"
            onClick={handleClick}
          />
        )}
        <div className={styles.tweet}>
          <div
            className={styles.top}
            onClick={() => {
              onTweetClick?.(id);
            }}
          >
            <div className={styles.title}>
              <p className={styles.name}>{name}</p>
              <p className={styles.acount}>
                @{account} · {fromNow}
              </p>
            </div>
            <p className={styles.text}>{description}</p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.reply} onClick={handleReplyClick}>
              <img src={replyIcon} alt="num-of-replies" />
              <span>{repliesNum}</span>
            </div>
            <div className={styles.like} onClick={handleLikeClick}>
              {like ? (
                <img src={likeFilled} alt="like-fill" />
              ) : (
                <img src={likeIcon} alt="like" />
              )}
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
        {showFlseAlert ? <Alert msg="回覆失敗" icon={warning} /> : ""}
      </div>
      <ReplyModal
        show={show}
        handleClose={handleClose}
        handleReply={handleReply}
        posterAvatar={avatar}
        userAvatar={userAvatar}
        postUserName={name}
        postUserAccount={account}
        postCreatedAt={fromNow}
        postDescription={description}
        showOverLetterAlert={showOverLetterAlert}
        showEmptyAlert={showEmptyAlert}
        onInputChange={(replyInput) => {
          setReply(replyInput);
        }}
        value={reply}
        errorMsg={clsx(
          "",
          { [styles.emptyError]: reply.trim().length === 0 },
          { [styles.overError]: reply.length > 140 }
        )}
      />
    </div>
  );
}
