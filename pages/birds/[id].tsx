import Link from "next/link";
import React  from "react";
import { kebabCase } from "../../utils";

export default function BirdPage(props: any) {
  return (
    <div>
      <h1>Hello, current bird is {props.bird.name}</h1><br/>
      <Link href="/">На главную</Link>
    </div>
  )
}

export async function getStaticProps(context: any) {
  const { birds } = require('../../database/birdsJSON');
  const currentBird = birds.find(bird => kebabCase(bird.id) === context.params.id);

  return {
    props: {
      bird: currentBird
    }
  }
}

export async function getStaticPaths() {
  const { birds } = require('../../database/birdsJSON');
  const paths = birds.map(bird => ({ params: { id: kebabCase(bird.id) } }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}