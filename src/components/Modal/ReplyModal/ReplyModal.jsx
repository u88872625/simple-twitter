import React, { useEffect, useState } from "react";
import styles from "./ReplyModal.module.scss";
import { Modal } from "react-bootstrap";
import IconClose from "../../../assets/icons/close.svg";
import DefaultAvatar from "../../../assets/icons/default-img.svg";
import { getUserInfo } from "../../../api/user";
import warning from "../../../assets/icons/warning.png";
import Alert from "../../shared/Alert/Alert";

const ReplyModal = ({
  posterAvatar,
  userAvatar,
  postUserName,
  postUserAccount,
  postCreatedAt,
  postDescription,
  onInputChange,
  show,
  handleClose,
  handleReply,
  value,
  errorMsg,
  showOverLetterAlert,
  showEmptyAlert,
}) => {
  return (
    <>
      <div>
        <div className={styles.Container}>
          <Modal className={styles.modal} show={show} onHide={handleClose}>
            <Modal.Header className={styles.header}>
              <Modal.Title>
                <div>
                  <img
                    className={styles.close}
                    src={IconClose}
                    alt="close.svg"
                    onClick={handleClose}
                    centered
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.tweetWrapper}>
                <img
                  className={styles.posterAvatar}
                  src={posterAvatar ? posterAvatar : DefaultAvatar}
                  alt="avatar.svg"
                />

                <div className={styles.postUserInfoWrapper}>
                  <div>
                    <span className={styles.postUserName}>{postUserName}</span>
                    <span className={styles.postUserAccount}>
                      @{postUserAccount}・{postCreatedAt}
                    </span>
                  </div>

                  <div className={styles.postContent}>
                    <p className={styles.ContentText}>{postDescription}</p>
                    <div className={styles.replyTo}>
                      <span className={styles.replyToText}>回覆給</span>
                      <span className={styles.replyAt}>@{postUserAccount}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.replyInputContainer}>
                <img
                  className={styles.userSelfAvatar}
                  src={userAvatar ? userAvatar : DefaultAvatar}
                  alt="avatar"
                />
                <textarea
                  className={styles.replyInput}
                  placeholder="推你的回覆"
                  onChange={(e) => onInputChange?.(e.target.value)}
                  value={value}
                />
              </div>
              <div className={errorMsg}></div>
              <button className={styles.replyButton} onClick={handleReply}>
                回覆
              </button>
            </Modal.Body>
            {showOverLetterAlert ? (
              <Alert msg="回覆不可超過140字" icon={warning} />
            ) : (
              ""
            )}
            {showEmptyAlert ? (
              <Alert msg="請輸入回覆內容" icon={warning} />
            ) : (
              ""
            )}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ReplyModal;
