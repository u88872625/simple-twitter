import React, { useState, useEffect } from "react";
import styles from "./AddTweet.module.scss";
import ReplyBtn from "../shared/shareBtn/ReplyBtn";
import DefaultAvatar from "../../assets/icons/default-img.svg";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import Alert from "../shared/Alert/Alert";
import warning from "../../assets/icons/warning.png";

const AddTweet = ({ avatar, value, inputStyle }) => {
  const { addTweet, setIsTweetUpdated } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showOverLetterAlert, setShowOverLetteAlert] = useState(false);
  const [showEmptyAlert, setShowEmptyAlert] = useState(false);
  const contentDelete = () => {
    setTweet("");
  };

  // 新增推文
  const handleSubmit = async () => {
    if (tweet.length > 140) {
      setShowOverLetteAlert(true);
      return;
    }
    if (tweet.trim().length === 0) {
      setShowEmptyAlert(true);
      return;
    }

    try {
      const res = await addTweet({ description: tweet });
      setIsUpdating(true);
      //若新增推文成功
      if (res) {
        setIsUpdating(false);
        setIsTweetUpdated(true);
        contentDelete();
      }
    } catch (error) {
      console.error("AddTweeet failed ]", error);
      contentDelete();
    }

    console.log(tweet);
  };

  useEffect(() => {
    setIsTweetUpdated(false);
  }, [setIsTweetUpdated]);

  return (
    <div className={styles.AddTweetContainer}>
      <div className={styles.title}>
        <h4>首頁</h4>
      </div>
      <div className={styles.AddTweet}>
        <img className={styles.avatar} src={avatar ? avatar : DefaultAvatar} />
        <textarea
          className={clsx(styles.input, inputStyle)}
          placeholder="有什麼新鮮事?"
          onChange={(e) => {
            setTweet(e.target.value);
          }}
          value={tweet}
        ></textarea>
        <div className={styles.button}>
          <ReplyBtn text={"推文"} onClick={handleSubmit} />
        </div>
      </div>
      {showOverLetterAlert ? (
        <Alert msg="推文不可超過140字" icon={warning} />
      ) : (
        ""
      )}
      {showEmptyAlert ? <Alert msg="請輸入推文內容" icon={warning} /> : ""}
    </div>
  );
};

export default AddTweet;
