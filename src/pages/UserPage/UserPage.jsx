import React from "react";
import styles from "./UserPage.module.scss";
import FontendLayout from "../../components/shared/layout/FontendLayout";
import UserInfoCard from "../../components/InfoCard/UserInfoCard";
import TweetTabs from "../../components/TweetTabs/TweetTabs";
import arrow from "../../assets/icons/back.svg";

const UserPage = () => {
  return (
    // <fragment>
    <FontendLayout>
      <div className={styles.header}>
        <img className={styles.arrow} src={arrow} alt="arrow" />
        <div className={styles.text}>
          <h5 className={styles.name}>John Doe</h5>
          <span className={styles.sub}>25推文</span>
        </div>
      </div>
      <div className={styles.infoCard}>
        <UserInfoCard />
      </div>
      <div className={styles.tabs}>
        <TweetTabs />
      </div>
    </FontendLayout>
    // </fragment>
  );
};

export default UserPage;
