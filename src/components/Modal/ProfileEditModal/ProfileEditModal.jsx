import React, { useState } from "react";
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

const ProfileEditModal = ({
  avatar,
  userBanner,
  handleChangeBanner,
  handleChangeAvatar,
  introBorderMode,
  nameBorderMode,
  onNameChange,
  onIntroChange,
  onSave,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  return (
    <div className={styles.container}>
      <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button>
      <div className={styles.container}>
        <Modal
          className={styles.modal}
          show={show}
          onHide={handleClose}
          size="lg"
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
              <button className={styles.button} onClick={onSave}>
                儲存
              </button>
            </div>
          </Modal.Header>
          <Modal.Body className={styles.modalBody}>
            <div className={styles.imageWrapper}>
              {/* 背景 */}
              <img
                className={styles.userBanner}
                src={userBanner ? userBanner : DefaultBanner}
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
                  type="file"
                  onChange={(e) => {
                    handleChangeBanner?.(e);
                  }}
                />

                {/* 更換頭像 */}
                <input
                  id="avatarChange"
                  className={styles.avatarChange}
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
      </div>
    </div>
  );
};

export default ProfileEditModal;
