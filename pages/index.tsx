import React from "react";
import type { NextPage } from "next";
import type { Bird } from "../types";
import { kebabCase } from "../utils";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useBird } from '../hooks';
import styles from "../styles/Home.module.css";
import cn from "classnames";
import { useState } from "react";
import Play from "../assets/images/play.svg";
import Pause from "../assets/images/pause.svg";

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
    "ж",
    "з",
    "и",
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
    "ц",
    "ч",
    "ш",
    "щ",
    "э",
    "ю",
  ];
  
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [currentSubstr, setCurrentSubstr] = useState<string>("");

  const { setPlayButtonValue, onClickPlay, onClickPause } = useBird();

  function onLetterChanged(letter: string) {
    setCurrentLetter(letter);
  }

  function onFilterByNameChanged(name: string) {
    setCurrentSubstr(name);
  }

  function onResetFilter() {
    setCurrentLetter("");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Атлас Птичек</title>
        <meta name="description" content="Классный сайт-атлас про птичек!" />
        <link rel="icon" href="/icon.svg" />
      </Head>
      <div className={styles.header}>
        <div className={styles.logo}>
          Пере<span>звон</span>
        </div>
        <div className={styles.searchByName}>
          <input
            onChange={(e) => {
              onFilterByNameChanged(e.target.value);
            }}
            placeholder="введите имя птички"
          />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.filterByLetter}>
          {alphabet.map((l) => {
            return (
              <span
                key={l}
                onClick={(e) => {
                  onLetterChanged(l);
                }}
                className={cn(
                  styles.letter,
                  currentLetter === l ? styles.selected : ""
                )}
              >
                {l}
              </span>
            );
          })}
          <div
            className={styles.resetFilter}
            onClick={(e) => {
              onResetFilter();
            }}
          >
            сбросить
          </div>
        </div>

        <nav>
          {birds
            .filter((b) => {
              if (currentLetter === "") {
                return b;
              }
              const firstLetter = b.name[0].toLowerCase() === currentLetter;
              return firstLetter;
            })
            .filter((b) => {
              if (currentSubstr === "") {
                return b;
              }
              const regExp = new RegExp("^" + currentSubstr.toLowerCase());
              const hasSubstr = b.name.toLowerCase().match(regExp);
              return hasSubstr;
            })
            .map((bird) => (
              <div key={bird.id} className={styles.birdCard}>
                <div className={styles.player}>
                  {setPlayButtonValue(bird.id) ? (
                    <Pause
                      onClick={() => onClickPause(bird.id)}
                      className={styles.playButton}
                    />
                  ) : (
                    <Play
                      onClick={() => {
                        onClickPlay(bird.id, bird.audioPath);
                      }}
                      className={styles.playButton}
                    />
                  )}
                  <Image
                    alt="Birdy"
                    className={styles.photo}
                    src={`${bird.imagesPaths[1]}`}
                    layout='fill'
                  />
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

export async function getStaticProps(context: any) {
  const { birds } = require("../database/birdsJSON");

  return {
    props: {
      birds,
    },
  };
}

export default Home;
