import Play from '../../assets/images/play.svg';
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Play />
        <img src="../../assets/images/logo.png" alt="logo" />
      </div>
      <div className={styles.searchByName}>
        <input placeholder="введите имя птички" />
      </div>
    </div>
  );
}
