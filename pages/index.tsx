import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { NextPage } from 'next';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  root: {
    people: string;
    planets: string;
    films: string;
    species: string;
    vehicles: string;
    starships: string;
  };
}

const Home: NextPage<HomeProps> = ({ root }) => {
  return (
    <div>
      <Head>
        <title>Holocron</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Holocron</h1>
        <ul className={styles.list}>
          <li>
            <Link href="/people">
              People
            </Link>
          </li>
          <li>
            <Link href="/planets">
              Planets
            </Link>
          </li>
          <li>Films</li>
          <li>Species</li>
          <li>Vehicles</li>
          <li>Starships</li>
        </ul>
      </main>
    </div>
  );
}

Home.getInitialProps = async function() {
  const res = await fetch('https://swapi.dev/api/');
  const data = await res.json();
  return { root: data };
}

export default Home;
