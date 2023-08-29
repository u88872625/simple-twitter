import React from "react";
import UserCard from "./UserCard/UserCard";
import styles from "./AdminUsers.module.scss";

const AdminUsers = ({ users, onClick }) => {
  return (
    <div className={styles.AdminUsers}>
      {users.map((user) => {
        return <UserCard key={user.id} user={user} onClick={onClick} />;
      })}
    </div>
  );
};

export default AdminUsers;
