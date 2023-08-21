import React from "react";
import styles from "./PopularList.module.scss";
import { ReactComponent as IconDefaultAvatar } from "../../assets/icons/default-img.svg";
import FollowBtn from "../shared/shareBtn/FollowBtn";
import FollowingBtn from "../shared/shareBtn/FollowingBtn";

export default function PopularList() {
  return (
    <div>
      <div className={styles.popularList}>
        <p className={styles.popularListTitle}>推薦跟隨</p>
        <div className={styles.popularListLine}></div>
        <PopularListItem name={"ABC"} account={"CCCCCCC"} />
      </div>
    </div>
  );
}

function PopularListItem({ id, name, account, avatar }) {
  return (
    <div className={styles.popularListItem}>
      {/* 暫時使用預設頭像 */}
      <div className={styles.PopularListItemAvatar}>
        <IconDefaultAvatar />
      </div>
      <div className={styles.popularItemInfo}>
        <p className={styles.popularItemName}>{name}</p>
        <p className={styles.popularItemAccount}>@{account}</p>
      </div>

      {/* 暫時使用單一Btn */}
      <div className={styles.popularItemBtn}>
        <FollowBtn text={"跟隨"} />
      </div>
    </div>
  );
}
