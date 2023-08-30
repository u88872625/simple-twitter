import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/shared/layout/AdminLayout/AdminLayout";
import AdminUsers from "../../components/Admin/AdminUsers/AdminUsers";
import { useAuth } from "../../contexts/AuthContext";
import { getAllUsers } from "../../api/user";
import styles from "./AdminUsersPage.module.scss";

const AdminUsersPage = () => {
  // const { getAllUsers } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsersAsync = async () => {
      try {
        const users = await getAllUsers();
        setUsers(users.map((user) => ({ ...user })));
      } catch (error) {
        console.error(error);
      }
    };
    getAllUsersAsync();
  }, []);

  return (
    <div>
      <AdminLayout>
        <div className={styles.header}>
          <h4>使用者列表</h4>
        </div>
        <div className={styles.card}>
          <AdminUsers users={users} />
        </div>
      </AdminLayout>
    </div>
  );
};

export default AdminUsersPage;
