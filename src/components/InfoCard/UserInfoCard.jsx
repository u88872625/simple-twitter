import styles from "./UserInfoCard.module.scss";
// import { useEffect, useState } from 'react';
// import { useNavigate} from 'react-router-dom';
import { useAuth } from "../../contexts/AuthContext";
import SettingBtn from "../shared/shareBtn/SettingBtn";
import ProfileEditModal from "../Modal/ProfileEditModal/ProfileEditModal";
import { useState } from "react";
import defaultAvatar from "../../assets/icons/default-img.svg";
import defaultBanner from "../../assets/images/bg-user.png";
import { Link } from "react-router-dom";

export default function UserInfoCard({ info, handleFollowDetail }) {
  // const [isEdit, setIsEdit] = useState(false)
  // const navigate = useNavigate()
  const { currentUser } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleEditModalOpen = () => {
    // setIsEdit(true)
    setShow(true);
  };

  if (!info) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        {info && info.banner ? (
          <img className={styles.banner} src={currentUser.banner} alt="banner" />
        ) : (
          <img
            className={styles.banner}
            src={defaultBanner}
            alt="defalt-banner"
          />
        )}
        {info.avatar ? (
          <img className={styles.avatar} src={currentUser.avatar} alt="avatar" />
        ) : (
          <img
            className={styles.avatar}
            src={defaultAvatar}
            alt="defalt-avatar"
          />
        )}
        <div className={styles.editBtn}>
          <SettingBtn text="編輯個人資料" onClick={handleEditModalOpen} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <h5 className={styles.userName}>{currentUser.name}</h5>
        <p className={styles.userAccount}>@{currentUser.account}</p>
      </div>
      <div className={styles.introduction}>{currentUser.introduction}</div>

      <div className={styles.showFollow} onClick={handleFollowDetail}>
        <p className={styles.showfolloing}>
          {info.followingsNum}個<span className={styles.sub}>跟隨中</span>
        </p>
        <p className={styles.showfollowers}>
          {info.followersNum}位<span className={styles.sub}>跟隨者</span>
        </p>
      </div>

      <ProfileEditModal
        show={show}
        handleClose={handleClose}
        // avatar={info.avatar}
        // userBanner={info.banner}
      />
    </div>
  );
}
