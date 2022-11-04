import type { NextPage } from "next";
import type { Bird } from "../types";
import { kebabCase } from "../utils";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Header from "./header/header";
import cn from "classnames"
// import play from "../assets/images/play";


interface HomeProps {
  birds: Array<Bird>;
}

const Home = ({ birds }: HomeProps) => {
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
    <div className={styles.container}>
      <Head>
        <title>Атлас Птичек</title>
        <meta name="description" content="Классный сайт-атлас про птичек!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.content}>
      <div className={styles.filterByLetter}>
        {alphabet.map((l) => {
          return (
            <span className={cn(styles.letter, l === 'а' ? styles.selected : "")}>
              {l}
            </span>
          );
        })}
      </div>
        <nav>
          {birds.slice(0, 128).map((bird) => (
            <div className={styles.birdCard}>
              <div className={styles.player}>
                <img className={styles.photo} src={`${bird.imagesPaths[1]}`} />
                {/* <div className={styles.playButton}>
                  {true ? (
                    <img src='#' />
                  ) : (
                    <img src="../../assets/images/pause.svg" />
                  )}
                </div> */}
              </div>
              <Link key={bird.name} href={`/birds/${kebabCase(bird.id)}`}>
                {bird.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

{
  /* <main className={styles.main}>
   */
}

/*
  Эта функция работает только на сервере, она прокидывает данные в пропсы страницы
*/
export async function getStaticProps(context: any) {
  const { birds } = require("../database/birdsJSON");

  return {
    props: {
      birds,
    },
  };
}

export default Home;
