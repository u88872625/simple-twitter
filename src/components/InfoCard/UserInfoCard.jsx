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


  //  變更頭像
  const handleChangeAvatar = (e) => {
    // 選取fileList裡的第一個文件更新狀態
    setAvatar(e.target.files[0]);
    // 預覽選取的頭像
    setAvatarPreview(URL.createObjectURL(e.target.files[0]));
  };

  // 變更背景
  const handleChangeBanner = (e) => {
    // 選取fileList裡的第一個文件更新狀態
    setBanner(e.target.files[0]);
    // 預覽選取的banner
    setBannerPreview(URL.createObjectURL(e.target.files[0]));
  };

  // 點擊儲存button
  const handleSave = async () => {
    try {
      setAvatarPreview(null);
      setBannerPreview(null);
      // 若input限制輸入條件
      if (name.trim().length === 0) return;
      if (name.length > 50 || introduction.length > 160) return;

      // API的資訊傳遞需轉換成 Form-data
      const formData = new FormData();
      //設定key及相對應的value
      for (let key in tempData) {
        formData.append(key, tempData[key]);
      }
      formData.set("name", name);
      formData.set("introduction", introduction);
      formData.set("avatar", avatar);
      formData.set("banner", banner);

      // 檢查對應是否正確
      for (const pair of formData.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

      const payload = {
        id: userId,
        name: name,
        introduction: introduction,
        avatar: avatar,
        banner: banner,
      };
      const response = await patchUserInfo(payload, formData);

      // 若成功把使用者編輯資料送出

      if (response.id) {
        console.log("Successupdated", response);
        updateUserInfo(response);
        Swal.fire({
          title: "上傳成功！",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setShow(false);
        window.location.reload();
      }
      // 若使用者編輯資料失敗
      else {
        Swal.fire({
          title: "上傳失敗！",
          allowOutsideClick: false,
          showConfirmButton: false,
        });
        setShow(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBannerDelete = () => {
    setBanner(null);
    setBannerPreview(null);

    const formData = new FormData();
    formData.delete("banner");
    setTempData((prevData) => ({ ...prevData, banner: null }));
  };

  useEffect(() => {
    const getUserInfoAsync = async () => {
      const userInfo = await getUserInfo(userId);
      updateUserInfo(userInfo);
      setTempData(userInfo);
      setName(userInfo.name);
      setIntroduction(userInfo.introduction);
      setAvatar(userInfo.avatar);
      setBanner(userInfo.banner);
    };
    getUserInfoAsync();
    setIsEditedUserInfo(false);
  }, [getUserInfo, userId, setIsEditedUserInfo]);


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
