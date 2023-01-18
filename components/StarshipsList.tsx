import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

interface Starships {
  name: string;
  url: string;
}

const StarshipsList: React.FC = () => {
  const [starships, setStarships] = useState<Starships[] | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [url, setUrl] = useState('https://swapi.dev/api/starships/?page=');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setStarships(data.results);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    }
    fetchData();
  }, [url]);

  console.log();

  const getStarshipId = (url: string) => {
    const id = url.split('/')[5];
    return id;
  }

  const getStarshipImage = (id: string, name: string) => {
    const image = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
    return image;
  }

  return (
    <div>
      <p>Number of starships: {starships ? starships.length : 'Loading...'}</p>
      {starships ? (
        <div>
        <ul>
          {starships.map((starship) => (
            <li key={starship.name}>
            <Link href="/starships/[id]" as={`/starships/${getStarshipId(starship.url)}`}>
              {starship.name}
            </Link>
            </li>
          ))}
        </ul>
        <NavigationButtons nextUrl={nextUrl} previousUrl={previousUrl} setUrl={setUrl} />
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default StarshipsList;
