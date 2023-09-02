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
// const dummytweet = [
//   {
//     id: 1,
//     UserId: 2,
//     description: "aabbbbbbbbbvcccccccccddddddddddreeeeee",
//     createdAt: "下午 1:46 · 2023年8月24日",
//     updatedAt: "2023-8-24t05",
//     likesNum: 3,
//     repliesNum: 3,
//     User: {
//       account: "user1",
//       name: "user1",
//       avatar:
//         "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*XGw9zUEZGYPNmeKGmyeX1g.jpeg",
//     },
//     isLiked: false,
//   },
// ];
export default function TopTweet({ tweet }) {
  // console.log('toptweet', tweet)
  // const likesNum =localStorage.getItem('')
  const { replyTweet, currentUser, setIsReplyUpdated } = useAuth();
  const [reply, setReply] = useState("");
  const [replyCount, setReplyCount] = useState(tweet.repliesNum);
  const [likeCount, setLikeCount] = useState(tweet.likesNum);
  const [like, setLike] = useState(tweet.isLiked);
  const [likeInProgress, setLikeInProgress] = useState(false);
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
    if (reply.length > 140 || reply.trim().length === 0) return;
    const response = await replyTweet(tweet.id, { comment: reply });

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
        {/* {isReply && <Modal/>} */}
      </div>
      <ReplyModal
        show={show}
        handleClose={handleClose}
        posterAvatar={tweet.User.avatar}
        postDescription={tweet.description}
        postUserName={tweet.User.name}
        postUserAccount={tweet.User.account}
        postCreatedAt={tweet.createdAt}
        userAvatar={currentUser?.avatar}
        handleReply={handleReply}
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
