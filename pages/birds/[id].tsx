import Link from "next/link";
import Image from "next/image";
import React from "react";
import { kebabCase } from "../../utils";
import styles from "./[id].module.css";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function BirdPage(props: any) {
  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <Link href="/">
          <div className={styles.logo}>
            Пере<span>звон</span>
          </div>
        </Link>
      </div>
      <div className={styles.birdInfo}>
        <div className={styles.sliderSideBar}>
          <Swiper
            modules={[Autoplay]}
            autoplay
            spaceBetween={5}
            slidesPerView={1}
            className={styles.slider}
          >
            {props.bird.imagesPaths.map((p: string, index: number) => {
              return (
                <SwiperSlide key={index} className={styles.slide}>
                  <Image src={p} alt="bird" layout='fill'/>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className={styles.audio}>
            <audio controls src={props.bird.audioPath}>
              AUDIO
            </audio>
          </div>
          <div className={styles.seeAlso}>
            Смотри также:
            <div className={styles.anotherBirds}>
              {props.bird.relatedBirds.map((b: string) => {
                const relatedBird = props.birds.find((bird: any) => bird.id === b);
                return (
                  <div key={relatedBird.id} className={styles.anotherBird}>
                    <Image src={relatedBird.imagesPaths[0]} alt="bird" width="200" height="150"/>
                    <div className={styles.anotherBirdName}>
                      <Link
                        key={relatedBird.name}
                        href={`/birds/${kebabCase(relatedBird.id)}`}
                      >
                        {relatedBird.name}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
        <div className={styles.text}>
          <h1>{props.bird.name}</h1>
          <h2>{props.bird.nameInLatin}</h2>
          {props.bird.article.map((p: number) => {
            return <p key={p}>{p}</p>;
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
      birds,
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
