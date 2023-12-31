import styles from "./TopTweet.module.scss";
import replyIcon from "../../assets/icons/reply.svg";
import likeIcon from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import { useState, useEffect } from "react";
import ReplyModal from "../Modal/ReplyModal/ReplyModal";
import { useAuth } from "../../contexts/AuthContext";
import { addLike, unLike, getUserInfo } from "../../api/user";
import { useNavigate } from "react-router";

import clsx from "clsx";
import Swal from "sweetalert2";

export default function TopTweet({ tweet }) {
  const { replyTweet, setIsReplyUpdated } = useAuth();
  const [reply, setReply] = useState("");
  const [replyCount, setReplyCount] = useState(tweet.repliesNum);
  const [likeCount, setLikeCount] = useState(tweet.likesNum);
  const [like, setLike] = useState(tweet.isLiked);
  const [likeInProgress, setLikeInProgress] = useState(false);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOverLetterAlert, setShowOverLetteAlert] = useState(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const contentDelete = () => {
    setReply("");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleReplyClick = () => {
    setShow(true);
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
          tweet.id,
          token
        );
        setLike(resIsLiked);
        setLikeCount(resLikesNum);
      } else {
        setLike(true);
        const { isLiked: resIsLiked, likesNum: resLikesNum } = await addLike(
          tweet.id,
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

  // 回覆功能
  const handleReply = async () => {
    //預防空值與回覆文字限制
    if (reply.trim().length === 0) {
      setShowEmptyAlert(true);
      return;
    }
    if (reply.length > 140) {
      setShowOverLetteAlert(true);
      return;
    }
    Swal.fire({
      title: "回覆中...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const response = await replyTweet(tweet.id, { comment: reply });

    Swal.close();
    //若新增推文成功
    if (response.data.comment) {
      contentDelete();
      handleClose();
      setReplyCount(replyCount + 1);
      setIsReplyUpdated(true);

      return;
    } else {
      contentDelete();
      handleClose();
      return alert("新增回覆失敗");
    }
  };

  // 點擊頭像
  const handleClick = async () => {
    // 如果點選自己
    if (tweet.UserId === userId) {
      navigate(`/${tweet.User.account}`);
    } else {
      // 如果點到其他人
      localStorage.setItem("otherUserId", tweet.UserId);
      const otherUserInfo = await getUserInfo(tweet.UserId);
      console.log("tweetitem:", otherUserInfo);
      const otherUserAccount = otherUserInfo.account;
      navigate(`/other/${otherUserAccount}`);
    }
  };

  // 取得個人資料
  useEffect(() => {
    if (userId) {
      const getUserInfoAsync = async () => {
        try {
          const userInfo = await getUserInfo(userId);
          console.log("User Info:", userInfo);
          setUserInfo(userInfo);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false); //當取得資料後變回false
        }
      };
      getUserInfoAsync();
    }
  }, [userId]);

  useEffect(() => {
    setIsReplyUpdated(false);
  }, [setIsReplyUpdated]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.top}>
            <div className={styles.info}>
              <img
                className={styles.avatar}
                src={tweet.User.avatar}
                alt="avatar"
                onClick={handleClick}
              />
              <div className={styles.title}>
                <p className={styles.name}>{tweet.User.name}</p>
                <p className={styles.acount}>@{tweet.User.account}</p>
              </div>
            </div>
            <div className={styles.text}>
              <p>{tweet.description}</p>
            </div>
            <span className={styles.date}>{tweet.createdAt}</span>
          </div>
          <div className={styles.bottom}>
            <div className={styles.showBox}>
              <p className={styles.showReply}>
                <span>{tweet.repliesNum}</span> 回覆
              </p>
              <p className={styles.showLikes}>
                <span>{likeCount}</span> 喜歡次數
              </p>
            </div>
            <div className={styles.icon}>
              <img
                className={styles.replyIcon}
                src={replyIcon}
                alt="num-of-replies"
                onClick={handleReplyClick}
              />
              <div className={styles.like} onClick={handleLikeClick}>
                {like ? (
                  <img src={likeFilled} alt="like-fill" />
                ) : (
                  <img src={likeIcon} alt="like" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReplyModal
        show={show}
        handleClose={handleClose}
        posterAvatar={tweet.User.avatar}
        postDescription={tweet.description}
        postUserName={tweet.User.name}
        postUserAccount={tweet.User.account}
        postCreatedAt={tweet.fromNow}
        userAvatar={userInfo.avatar}
        handleReply={handleReply}
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
