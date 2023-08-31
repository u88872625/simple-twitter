import { useState } from "react";
import TweetContent from "./TweetContent/TweetContent.jsx";
import ReplyContent from "./ReplyContent/ReplyContent.jsx";
import LikeContent from "./LikeContent/LikeContent.jsx";
import styles from "./TweetTabs.module.scss";

export default function TweetTabs({
  tweets,
  replies,
  likes,
  onClick,
  onTweetClick,
  onLikeClick,
  like,
  likeCount
}) {
  const [activeTab, setActiveTab] = useState("tweets");

  // 監聽點擊哪個Tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className={styles.tabBtns}>
        <button
          className={activeTab === "tweets" ? styles.active : ""}
          onClick={() => handleTabClick("tweets")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "tweets" ? styles.active : ""
            }`}
          >
            推文
          </span>
        </button>
        <button
          className={activeTab === "replies" ? styles.active : ""}
          onClick={() => handleTabClick("replies")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "replies" ? styles.active : ""
            }`}
          >
            回覆
          </span>
        </button>
        <button
          className={activeTab === "likes" ? styles.active : ""}
          onClick={() => handleTabClick("likes")}
        >
          <span
            className={`${styles.buttonText} ${
              activeTab === "likes" ? styles.active : ""
            }`}
          >
            喜歡的內容
          </span>
        </button>
      </div>
      <div className={styles.tabContent}>
        {activeTab === "tweets" && (
          <TweetContent
            tweets={tweets}
            onClick={onClick}
            onTweetClick={(id) => onTweetClick?.(id)}
            onLikeClick={(id) => onLikeClick?.(id)}
            like={like}
            likeCount={likeCount}
          />
        )}
        {activeTab === "replies" && <ReplyContent replies={replies} />}
        {activeTab === "likes" && (
          <LikeContent
            likes={likes}
            onClick={onClick}
            onTweetClick={(id) => onTweetClick?.(id)}
            like={like}
            likeCount={likeCount}
          />
        )}
      </div>
    </>
  );
}
