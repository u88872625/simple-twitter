import styles from "./UserInfoCard.module.scss";
// import { useEffect, useState } from 'react';
// import { useNavigate} from 'react-router-dom';
import SettingBtn from "../shared/shareBtn/SettingBtn";
import ProfileEditModal from "../Modal/ProfileEditModal/ProfileEditModal";
import { useState } from "react";

export default function UserInfoCard({
  name,
  account,
  introduction,
  avatar,
  banner,
  follower,
  following,
}) {
  // const [isEdit, setIsEdit] = useState(false)
  // const navigate = useNavigate()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleEditModalOpen = () => {
    // setIsEdit(true)
    setShow(true);
  };

  // useEffect(() => {
  //   if (isEdit) {
  //     navigate("/signup");
  //   }
  // }, [navigate, isEdit]);

  return (
    <div className={styles.container}>
      <div className={styles.img}>
        <img
          className={styles.banner}
          src="https://images.unsplash.com/photo-1580436541340-36b8d0c60bae"
          alt="banner"
        />
        <img
          className={styles.avatar}
          src="https://pic.baike.soso.com/ugc/baikepic2/1284/20230320164402-1468310604_jpeg_1131_754_187393.jpg/1284"
          alt="avatar"
        />
        <div className={styles.editBtn}>
          <SettingBtn text="編輯個人資料" onClick={handleEditModalOpen} />
        </div>
      </div>
      <div className={styles.userInfo}>
        <h5 className={styles.userName}>John Doe</h5>
        <p className={styles.userAccount}>@heyjohn</p>
      </div>
      <div className={styles.introduction}>
        Passionate individual with expertise in [Field]. Skilled in [Skills]
        with a record of [Achievements]. Enthusiastic problem solver, eager to
        collaborate.
      </div>
      <div className={styles.showFollow}>
        <p className={styles.showfolloing}>
          34個<span className={styles.sub}>跟隨中</span>
        </p>
        <p className={styles.showfollowers}>
          59位<span className={styles.sub}>跟隨者</span>
        </p>
      </div>
      <ProfileEditModal
        show={show}
        handleClose={handleClose}
        avatar={avatar}
        userBanner={banner}
      />
    </div>
  );
}
