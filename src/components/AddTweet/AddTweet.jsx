import React, { useState, useEffect } from "react";
import styles from "./AddTweet.module.scss";
import ReplyBtn from "../shared/shareBtn/ReplyBtn";
import DefaultAvatar from "../../assets/icons/default-img.svg";
import clsx from "clsx";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const AddTweet = ({ avatar, value, inputStyle }) => {
  const { addTweet, isTweetUpdated } = useAuth();
  const [tweet, setTweet] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  // 新增推文
  const handleSubmit = async () => {
    if (tweet.length > 140) {
      Swal.fire({
        position: "top",
        title: "推文不可超過140字",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }
    if (tweet.trim().length === 0) {
      Swal.fire({
        position: "top",
        title: "請輸入推文內容",
        timer: 1000,
        icon: "error",
        showConfirmButton: false,
      });
      return;
    }
    // 點擊推文按鈕跳出loading提示
    Swal.fire({
      title: "推文中...",
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    try {
      const res = await addTweet({ description: tweet });
      setIsUpdating(true);
      //若新增推文成功
      if (res) {
        setIsUpdating(false);

        // // 畫面自動重新整理
        window.location.reload();
      }
    } catch (error) {
      console.error("AddTweeet failed ]", error);
    }

    console.log(tweet);
  };

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
