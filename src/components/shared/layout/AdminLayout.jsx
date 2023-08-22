import styles from "./AdminLayout.module.scss";
import AdminSideBar from "../../SideBar/AdminSideBar.jsx";

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <AdminSideBar />
      </div>
      <div className={styles.rightContainer}>{children}</div>
    </div>
  );
}
