import { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import type { Bird } from "../types";
import { kebabCase } from "../utils";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Header from "./header/header";
// import play from "../assets/images/play";

interface HomeProps {
  birds: Array<Bird>;
}

const Home = ({ birds }: HomeProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Атлас Птичек</title>
        <meta name="description" content="Классный сайт-атлас про птичек!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.overlayContent}>
        {/* <div style={{ fontSize: "128px" }}>🐔</div>
        <h1 className={styles.title}>Добро пожаловать в атлас про птичек!</h1> */}
        <nav>
          {birds.slice(0, 25).map((bird) => (
            <div className={styles.birdCard}>
              <div className={styles.player}>
                <img src={`${bird.imagesPaths[0]}`} />
                <div className={styles.photo}>
                  {true ? (
                    <img src='#' />
                  ) : (
                    <img src="../../assets/images/pause.svg" />
                  )}
                </div>
              </div>
              <Link key={bird.name} href={`/birds/${kebabCase(bird.id)}`}>
                {bird.name}
              </Link>
            </div>
          ))}
        </nav>
      </div>

      {/* <video ref={bird} autoPlay loop controls>
        <source src="/bird.mp4" type="video/mp4" />
      </video> */}
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
