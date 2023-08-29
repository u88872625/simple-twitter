import styles from "./TopTweet.module.scss";
import replyIcon from "../../assets/icons/reply.svg";
import like from "../../assets/icons/like.svg";
import likeFilled from "../../assets/icons/like-filled.svg";
import { useState, useEffect } from "react";
import ReplyModal from "../Modal/ReplyModal/ReplyModal";
import { useAuth } from "../../contexts/AuthContext";

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
  const { replyTweet, currentUser, setIsReplyUpdated } = useAuth();
  const [isReply, setIsReply] = useState(false);
  const [isLike, setIsLike] = useState(tweet.isLiked);
  const [likesNum, setLikesNum] = useState(tweet.likesNum);
  const [reply, setReply] = useState("");
  const [replyCount, setReplyCount] = useState(tweet.repliesNum);
  const contentDelete = () => {
    setReply("");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleReplyClick = () => {
    setIsReply(true);
    setShow(true);
  };

  // 更新like數 後續需要把變動傳回後端
  const handleLikeClick = () => {
    setIsLike(!isLike);
    tweet.isLiked = !tweet.isLiked;

    if (isLike) {
      setLikesNum(likesNum + 1);
    } else {
      setLikesNum(likesNum - 1);
    }
  };

  // 回覆功能
  // const handleReply = async () => {
  //   //預防空值與回覆文字限制
  //   if (reply.length > 140) return;
  //   if (reply.trim().length === 0) return;
  //   const response = await replyTweet(tweet.id, { comment: reply });
  //   //若新增推文成功
  //   if (response.data.comment) {
  //     contentDelete();
  //     handleClose();
  //     setReplyCount(replyCount + 1);
  //     return;
  //   } else {
  //     contentDelete();
  //     handleClose();
  //     return alert("新增回覆失敗");
  //   }
  // };

  // useEffect(() => {
  //   setIsReplyUpdated(false);
  // }, [setIsReplyUpdated]);

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
                <span>{tweet.likesNum}</span> 喜歡次數
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
                {tweet.isLiked ? (
                  <img src={likeFilled} alt="like-fill" />
                ) : (
                  <img src={like} alt="like" />
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
        // handleReply={handleReply}
        onInputChange={(replyInput) => {
          setReply(replyInput);
        }}
        value={reply}
      />
    </div>
  );
}
