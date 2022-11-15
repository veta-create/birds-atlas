import React from "react";
import type { NextPage } from "next";
import type { Audio, Bird } from "../types";
import { kebabCase } from "../utils";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import cn from "classnames";
import { useRef, useState } from "react";
import Play from "../assets/images/play.svg";
import Pause from "../assets/images/pause.svg";
import {
  useFilterByFirstLetter,
  useFilterByName,
  useSwitchingPlay,
} from "./useBird";

interface HomeProps {
  birds: Array<Bird>;
}
interface Audios {
  audios: Array<Audio>
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
    }

    if (findBirdInAudios(id) !== undefined) {
      console.log(findBirdInAudios(id), "findBirdInAudios(id)");

      return findBirdInAudios(id).play;
    }
  }

  // function onClickPlay(play: boolean, id: string, path: string) {
  //   // useSwitchingPlay(play, id, path);

  //   const checkExistEl = findBirdInAudios(id);

  //   const newAudios = [...audios];

  //   if (checkExistEl) {
  //     for (let i = 0; i < newAudios.length; i++) {
  //       const audio = newAudios[i];

  //       if (audio.id === id) {
  //         const copy = { ...audio };
  //         copy.play = true;

  //         newAudios[i] = copy;
  //       }
  //     }

  //     checkExistEl.audio.play();

  //     setAudios(newAudios);
  //   } else {
  //     let newAudio = new Audio(path);
  //     setAudios([...audios, { id: id, audio: newAudio, play: true }]);
  //     newAudio.play();
  //     console.log(audios, "play");
  //   }
  // }

  // function onClickPause(id: string) {
  //   findBirdInAudios(id).audio.pause();

  //   let muteAudios = [...audios];

  //   for (let i = 0; i < muteAudios.length; i++) {
  //     muteAudios[i].play = false;
  //   }

  //   setAudios(muteAudios);
  // }

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
