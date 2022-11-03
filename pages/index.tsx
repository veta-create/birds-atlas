import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import type { Bird } from '../types'
import { kebabCase } from '../utils'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

interface HomeProps {
  birds: Array<Bird>
}

const Home = ({ birds }: HomeProps) => {
  const bird = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    document.getElementById('body')?.click();
  }, [])

  const handleOverlayClick = () => {
    if(isPlaying) {
      return;
    }
    setIsPlaying(true);
    bird.current.play()
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Атлас Птичек</title>
        <meta name="description" content="Классный сайт-атлас про птичек!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.overlay} onClick={handleOverlayClick} />

      <div className={styles.overlayContent}>
        <div style={{ fontSize: '128px' }}>🐔</div>
        <h1 className={styles.title}>
          Добро пожаловать в атлас про птичек!
        </h1>
        <nav>
          {birds.slice(0, 5).map(bird => (
            <Link key={bird.name} href={`/birds/${kebabCase(bird.id)}`}>{bird.name}</Link>
          ))}
        </nav>
      </div>

      <video ref={bird} autoPlay loop controls>
        <source src="/bird.mp4" type="video/mp4"/>
      </video>
    </div>
  )
}

{/* <main className={styles.main}>
 */}

/*
  Эта функция работает только на сервере, она прокидывает данные в пропсы страницы
*/
export async function getStaticProps(context: any) {
  const { birds } = require('../database/birdsJSON');

  return {
    props: {
      birds
    }
  }
}

export default Home;