import styles from "./TweetItem.module.scss";
import replyIcon from "../../assets/icons/reply.svg";
import likeIcon from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import defaultAvatar from "../../assets/icons/default-img.svg";
import { useState, useEffect } from "react";
import ReplyModal from "../Modal/ReplyModal/ReplyModal";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import clsx from "clsx";
import { addLike, unLike } from "../../api/user";

export default function TweetItem({ tweet, onTweetClick }) {
  let { name, account, avatar } = tweet.User;
  const {
    id,
    UserId,
    description,
    createdAt,
    repliesNum,
    likesNum,
    isLiked,
    fromNow,
  } = tweet;
  const { replyTweet, currentUser, setIsReplyUpdated } = useAuth();
  // const [isReply, setIsReply] = useState(false);
  const [show, setShow] = useState();
  const [reply, setReply] = useState("");
  const [replyCount, setReplyCount] = useState(repliesNum);
  const [likeCount, setLikeCount] = useState(likesNum);
  const [like, setLike] = useState(isLiked);
  const token = localStorage.getItem("token");
  const contentDelete = () => {
    setReply("");
  };

  //  show Modal
  const handleClose = () => setShow(false);
  const handleReplyClick = () => {
    setShow(true);
  };

  // 回覆功能
  const handleReply = async () => {
    if (reply.length > 140) return;
    if (reply.trim().length === 0) return;
    const response = await replyTweet(id, { comment: reply });
    //若新增推文成功
    if (response.data.comment) {
      handleClose();
      contentDelete();
      setReplyCount(replyCount + 1);
      return;
    } else {
      contentDelete();
      handleClose();
      Swal.fire({
        position: "top",
        title: "回覆失敗！",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  // 追蹤哪個貼文被按讚
  const handleLikeClick = async () => {
    try {
      if (like === true) {
        await unLike(id, token);
        setLike((prevLike) => !prevLike);
        setLikeCount((prevCount) => prevCount - 1);
      } else {
        await addLike(id, token);
        setLike((prevLike) => !prevLike);
        setLikeCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setIsReplyUpdated(false);
  }, [setIsReplyUpdated]);

  return (
    <div
      className={styles.container}
      onClick={() => {
        onTweetClick?.(id);
      }}
    >
      <div className={styles.wrapper}>
        {avatar ? (
          <img className={styles.avatar} src={avatar} alt="avatar" />
        ) : (
          <img
            className={styles.avatar}
            src={defaultAvatar}
            alt="defalt-avatar"
          />
        )}
        <div className={styles.tweet}>
          <div className={styles.title}>
            <p className={styles.name}>{name}</p>
            <p className={styles.acount}>
              @{account} · {fromNow}
            </p>
          </div>
          <p className={styles.text}>{description}</p>

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
      </div>
      <ReplyModal
        show={show}
        handleClose={handleClose}
        handleReply={handleReply}
        posterAvatar={avatar}
        userAvatar={currentUser?.avatar}
        postUserName={name}
        postUserAccount={account}
        postCreatedAt={fromNow}
        postDescription={description}
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
      {/* {isReply && <Modal/>} */}
    </div>
  );
}
