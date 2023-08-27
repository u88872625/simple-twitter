import React, { useState, useEffect } from "react";
import styles from "./AddTweet.module.scss";
import ReplyBtn from "../shared/shareBtn/ReplyBtn";
import avatarUser from "../../assets/images/avater-user.png";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext";

const AddTweet = ({ avatar, value, inputStyle }) => {
  const { addTweet, isTweetUpdated } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // 清除推文框內的文字
  const deleteContent = () => {
    setTweet("");
  };

  // 上方AddTweet新增推文
  const handleSubmit = async () => {
    try {
      if (isUpdating) return;
      if (tweet.length > 140) return;
      if (tweet.trim().length < 1) return;
      const res = await addTweet({ description: tweet });
      setIsUpdating(true);
      //若新增推文成功
      if (res) {
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("AddTweeet failed ]", error);
    }

    console.log(tweet);
  };

  useEffect(() => {
    deleteContent();
  }, [isTweetUpdated]);
  return (
    <div className={styles.AddTweetContainer}>
      <div className={styles.title}>
        <h4>首頁</h4>
      </div>
      <div className={styles.AddTweet}>
        <img className={styles.avatar} src={avatar ? avatar : avatarUser} />
        <textarea
          className={clsx(styles.input, inputStyle)}
          placeholder="有什麼新鮮事?"
          onChange={(e) => {
            setTweet(e.target.value);
          }}
          value={value}
        ></textarea>
        <div className={styles.button}>
          <ReplyBtn text={"推文"} onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddTweet;
