import React, { useState } from "react";
import styles from "./ReplyModal.module.scss";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import IconClose from "../../../assets/icons/close.svg";
import DefaultAvatar from "../../../assets/icons/default-img.svg";

const ReplyModal = ({
  avatar,
  postUserName,
  postUserAccount,
  postCreatedAt,
  postDescription,
  onInputChange,

  borderLine,
  // show,
  // handleClose,
}) => {
  const [reply, setReply] = useState("");

  function handleOnSave() {
    if (reply.trim().length === 0) {
      return;
    }
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          Launch demo modal
        </Button>

        <div className={styles.Container}>
          <Modal
            className={styles.modal}
            show={show}
            onHide={handleClose}
            size="lg"
          >
            <Modal.Header className={styles.header}>
              <Modal.Title>
                <div>
                  <img
                    className={styles.close}
                    src={IconClose}
                    alt="close.svg"
                    onClick={handleClose}
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>
              <div className={styles.tweetWrapper}>
                <img
                  className={styles.postUserAvatar}
                  src={avatar ? avatar : DefaultAvatar}
                  alt="avatar.svg"
                />

                <div className={styles.postUserInfoWrapper}>
                  <div>
                    <span className={styles.postUserName}>
                      {"postUserName"}
                    </span>
                    <span className={styles.postUserAccount}>
                      @{postUserAccount}・{postCreatedAt}
                    </span>
                  </div>

                  <div className={styles.postContent}>
                    <p className={styles.ContentText}>{postDescription}</p>
                  </div>
                  <div className={styles.replyTo}>
                    <span className={styles.replyToText}>回覆給</span>
                    <span className={styles.replyAt}>@{postUserAccount}</span>
                  </div>
                </div>
              </div>
              <div className={styles.replyInputContainer}>
                <img
                  className={styles.userSelfAvatar}
                  src={avatar ? avatar : DefaultAvatar}
                  alt="avatar"
                />
                <textarea
                  className={styles.replyInput}
                  placeholder="推你的回覆"
                  onChange={(replyInput) => setReply(replyInput)}
                />
              </div>
              <div className={styles.noText}>內容不可空白</div>
              <button className={styles.replyButton} onClick={handleOnSave}>
                回覆
              </button>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default ReplyModal;
