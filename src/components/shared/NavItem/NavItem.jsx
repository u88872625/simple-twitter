import styles from "./NavItem.module.scss";
import {NavLink, useLocation} from 'react-router-dom'
import {memo} from 'react'


const NavItem=({ icon, activeIcon, text, path, onClick }) => {
  // 取得當前路徑 如當前路徑和傳入的path相同 則增加active class
  const location = useLocation()
  const isActive = location.pathname === path

  return (
    <li className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
      <NavLink className={styles.a} to={path} onClick={onClick}>
        <img
          className={styles.icon}
          src={isActive ? activeIcon : icon}
          alt={text}
        />
        {text}
      </NavLink>
    </li>
  );
}

// 防止重新渲染整個導覽列
export default memo(NavItem)