import styles from "./header.module.css";
import cn from "classnames";

export default function Header() {
  const alphabet: Array<string> = [
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ё",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "э",
    "ю",
    "я",
  ];
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="../../assets/images/logo.png" alt="logo" />
      </div>
      <div className={styles.filterByLetter}>
        {alphabet.map((l) => {
          return (
            <span className={cn(styles.letter, l === 'а' ? styles.selected : "")}>
              {l}
            </span>
          );
        })}
      </div>
      <div className={styles.searchByName}>
        <input placeholder="введите имя птички" />
      </div>
    </div>
  );
}
