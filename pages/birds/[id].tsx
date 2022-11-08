import Link from "next/link";
import React from "react";
import { kebabCase } from "../../utils";
import styles from "./[id].module.css";

export default function BirdPage(props: any) {

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src="../../assets/images/logo.png" />
        </div>
      </div>
      <div className={styles.birdInfo}>
        <div className={styles.sliderSideBar}>
          <div className={styles.slider}>
            <img src={`${props.bird.imagesPaths[0]}`} />
          </div>
          <div className={styles.audio}>
            <button><p>нажмите, чтобы слушать</p></button>
            <audio controls src={props.bird.audioPath}>AUDIO</audio>
            {/* controls нужен */}
          </div>
          <div className={styles.seeAlso}>
            Смотри также:
            <div className={styles.anotherBirds}>
              <div className={styles.anotherBird}>
                <img src="#" />
                Кукушка обыкновенная
              </div>
              <div className={styles.anotherBird}>
                <img src="#" />
                name
              </div>
            </div>
          </div>

          <Link href="/">На главную</Link>
        </div>
        <div className={styles.text}>
          <h1>{props.bird.name}</h1>
          <h2>{props.bird.nameInLatin}</h2>
          {props.bird.article.map((p: number) => {
            return <p>{p}</p>;
          })}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const { birds } = require("../../database/birdsJSON");
  const currentBird = birds.find(
    (bird: { id: any }) => kebabCase(bird.id) === context.params.id
  );

  return {
    props: {
      bird: currentBird,
      birds
    },
  };
}

export async function getStaticPaths() {
  const { birds } = require("../../database/birdsJSON");
  const paths = birds.map((bird: { id: any }) => ({
    params: { id: kebabCase(bird.id) },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'б
  };
}
