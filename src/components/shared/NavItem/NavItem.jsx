import styles from "./NavItem.module.scss";

export default function NavItem({
  icon,
  activeIcon,
  text,
  url,
  isActive,
  onClick,
}) {
  return (
    <li className={`${styles.navItem} ${isActive ? styles.active : ""}`}>
      <a className={styles.a} href={url} onClick={onClick}>
        <img
          className={styles.icon}
          src={isActive ? activeIcon : icon}
          alt={text}
        />
        {text}
      </a>
    </li>
  );
}
