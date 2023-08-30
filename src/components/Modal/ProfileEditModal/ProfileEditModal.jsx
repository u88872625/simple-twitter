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
  name,
  introduction,
  avatar,
  banner,
  handleChangeBanner,
  handleChangeAvatar,
  introBorderMode,
  nameBorderMode,
  onNameChange,
  onIntroChange,
  show,
  handleClose,
  handleSave,
  handleBannerDelete,
}) => {
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
              <button
                className={styles.button}
                type="button"
                onClick={handleSave}
              >
                儲存
              </button>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.imageWrapper}>
              {/* 背景 */}
              <img className={styles.userBanner} src={banner}></img>
              {/* 頭像 */}
              <img className={styles.avatar} src={avatar}></img>
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
                  onClick={handleBannerDelete}
                />
                {/* 更換背景 */}
                <input
                  id="bannerChange"
                  className={styles.bannerChange}
                  name="banner"
                  type="file"
                  onChange={(e) => {
                    handleChangeBanner?.(e);
                  }}
                />

                {/* 更換頭像 */}
                <input
                  id="avatarChange"
                  className={styles.avatarChange}
                  name="avatar"
                  type="file"
                  onChange={(e) => {
                    handleChangeAvatar?.(e);
                  }}
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
                onChange={onNameChange}
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
                onChange={onIntroChange}
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
