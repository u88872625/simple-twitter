import React from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import styles from "./AddTweetModal.module.scss";
import IconClose from "../../../assets/icons/close.svg";
import clsx from "clsx";
import IconDefaulAvatar from "../../../assets/icons/default-img.svg";

const AddTweetModal = ({
  value,
  onChange,
  inputStyle,
  avatar,
  lengthError,
  // handleClose,
  // show,
  onSubmit,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button className={styles.test} variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      <div className={styles.container}>
        <Modal
          className={styles.modal}
          show={show}
          onHide={handleClose}
          size="lg"
          centered
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
            <div className={styles.AddTweet}>
              <img
                className={styles.avatar}
                src={avatar ? avatar : IconDefaulAvatar}
              />
              <div className={styles.inputWrapper}>
                <textarea
                  className={clsx(styles.input, inputStyle)}
                  placeholder="有什麼新鮮事?"
                  onChange={(e) => onChange?.(e.target.value)}
                  value={value}
                ></textarea>
                <div>
                  <p className={clsx(styles.noLengthError, lengthError)}>
                    字數不可超過140字
                  </p>
                </div>
                <button className={styles.button} onClick={onSubmit}>
                  推文
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddTweetModal;
