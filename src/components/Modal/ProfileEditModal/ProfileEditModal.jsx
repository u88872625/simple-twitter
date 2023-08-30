import React, { useState, useEffect } from "react";
// import {useForm} from 'react-hook-form'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IconClose from "../../../assets/icons/close.svg";
import styles from "./ProfileEditModal.module.scss";
import DefaultBanner from "../../../assets/images/bg-user.png";
import DefaultAvatar from "../../../assets/icons/default-img.svg";
import photo from "../../../assets/icons/editPhoto.svg";
import BannerDelete from "../../../assets/icons/close-white.svg";
import AuthInput from "../../AuthInput/AuthInput";
import clsx from "clsx";
import { useAuth } from "../../../contexts/AuthContext";
import { patchUserInfo } from "../../../api/user";
import Alert from "../../../components/shared/Alert/Alert";

const ProfileEditModal = ({
  // avatar,
  // userBanner,
  // handleChangeBanner,
  // handleChangeAvatar,
  introBorderMode,
  nameBorderMode,
  onNameChange,
  onIntroChange,
  onSave,
  show,
  handleClose,
}) => {
  const { currentUser, updateUserInfo, setEditedUserInfo } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [introduction, setIntroduction] = useState("");
  const [avatar, setAvatar] = useState(currentUser?.avatar || DefaultAvatar);
  const [banner, setBanner] = useState(currentUser?.banner || DefaultBanner);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
   const [showAlert, setShowAlert] = useState(false);
   const [alertMsg, setAlerMsg] = useState("");



  //  變更頭像
  const handleChangeAvatar = (e) => {
    setSelectedAvatar(e.target.files[0]);
  };

  // 變更背景
  const handleChangeBanner = (e) => {
    setSelectedBanner(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();

      if (selectedAvatar) {
        formData.append("avatar", selectedAvatar);
      }
      if (selectedBanner) {
        formData.append("banner", selectedBanner);
      }

      const updateUserInfoRes = await patchUserInfo(currentUser.id, formData);

      if (updateUserInfoRes.success) {
        setEditedUserInfo(updateUserInfoRes);
        updateUserInfo(updateUserInfoRes);
        handleClose();
        setShowAlert(true);
        setAlerMsg("儲存成功!");
      } else {
        setShowAlert(true);
        setAlerMsg(updateUserInfo.message || "儲存失敗!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form>
        <Modal
          className={styles.modal}
          show={show}
          onHide={handleClose}
          centered
        >
          <Modal.Header className={styles.modalHeader}>
            <div className={styles.headerWrapper}>
              <img
                className={styles.close}
                src={IconClose}
                alt="close.svg"
                onClick={handleClose}
              />

              <h5 className={styles.text}>編輯個人資料</h5>
              {/* <button className={styles.button} onClick={handleSave}> */}
              <button className={styles.button} type="button" onClick={handleSave}>
                儲存
              </button>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.imageWrapper}>
              {/* 背景 */}
              <img
                className={styles.userBanner}
                src={banner ? banner : DefaultBanner}
              ></img>
              {/* 頭像 */}
              <img
                className={styles.avatar}
                src={avatar ? avatar : DefaultAvatar}
              ></img>
              <div className={styles.fileChangeWrapper}>
                <img
                  className={styles.editPhoto}
                  src={photo}
                  alt="editPhoto.svg"
                />
                <img
                  className={styles.deleteIcon}
                  src={BannerDelete}
                  alt="BannerDelete.svg"
                />
                {/* 更換背景 */}
                <input
                  id="bannerChange"
                  className={styles.bannerChange}
                  name="banner"
                  type="file" 
                  
                  onChange={handleChangeBanner}
                />

                {/* 更換頭像 */}
                <input
                  id="avatarChange"
                  className={styles.avatarChange}
                  name="avatar"
                  type="file" 
                  
                  onChange={handleChangeAvatar}
                />

                <img
                  className={styles.editAvatarIcon}
                  src={photo}
                  alt="editPhoto.svg"
                />
              </div>
            </div>

            {/* Input Section */}
            <div className={styles.inputWrapper}>
              {/* 使用者input的名字 */}
              <AuthInput
                inputStyle={styles.nameInput}
                borderMode={clsx("", { [styles.nameError]: name.length > 50 })}
                label={"名稱"}
                onChange={(nameInput) => setName(nameInput)}
                value={name}
                dataPage={"profileEditModal"}
              />
              {/* 使用者input的自我介紹 */}
              <AuthInput
                inputStyle={styles.introductionInput}
                borderMode={clsx("", {
                  [styles.introError]: introduction.length > 160,
                })}
                label={"自我介紹"}
                onChange={(introInput) => setIntroduction(introInput)}
                value={introduction}
                dataPage={"profileEditModal"}
              />
            </div>
          </Modal.Body>
        </Modal>
      </form>
    </div>
  );
};

export default ProfileEditModal;
