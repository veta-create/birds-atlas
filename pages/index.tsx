import React from "react";
import type { NextPage } from "next";
import type { Bird } from "../types";
import { kebabCase } from "../utils";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import cn from "classnames";
import { useRef, useState } from "react";
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
  const [play, setPlay] = useState(false);
  const [audios, setAudios] = useState([]);

  function onLetterChanged(letter: string) {
    setCurrentLetter(letter);
  }

  function onFilterByNameChanged(name: string) {
    setCurrentSubstr(name);
  }

  function onResetFilter() {
    setCurrentLetter("");
  }

  function findBirdInAudios(id: string) {
    return audios.find((el) => {
      if (el.id === id) {
        return el;
      }
      return false;
    });
  }

  function setPlayButtonValue(id: string) {

    if (findBirdInAudios(id) === undefined) {
      return false;
    } else if (
      findBirdInAudios(id) !== undefined &&
      findBirdInAudios(id).play
    ) {
      return true;
    } else if (
      findBirdInAudios(id) !== undefined &&
      findBirdInAudios(id).play === false
    ) {
      return false;
    }
  }

  function onClickPlay(id: string, path: string) {
    const checkExistEl = findBirdInAudios(id);

    if (checkExistEl) {
      checkExistEl.audio.play();
    } else {
      let newAudio = new Audio(path);
      setAudios([ ...audios, { id: id, audio: newAudio, play: true }]);
      newAudio.play();
      console.log(audios, "play")
    }
  }

  function onClickPause(id: string) {
    findBirdInAudios(id).audio.pause();
    let muteAudios = audios;
    for (let i = 0; i < muteAudios.length; i++) {
      muteAudios[i].play = false;
    }
    setAudios(muteAudios);
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
              <div className={styles.birdCard}>
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
                  <img
                    className={styles.photo}
                    src={`${bird.imagesPaths[1]}`}
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
