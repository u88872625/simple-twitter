import React from "react";
import UserCard from "./UserCard/UserCard";

const AdminUsers = ({ users, onClick }) => {
  return (
    <div>
      {users.map((user) => {
        <UserCard onClick={onClick} />;
      })}
    </div>
  );
};

export default AdminUsers;
