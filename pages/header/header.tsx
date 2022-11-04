import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="../../assets/images/logo.png" alt="logo" />
      </div>
      <div className={styles.searchByName}>
        <input placeholder="введите имя птички" />
      </div>
    </div>
  );
}
