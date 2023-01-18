import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Starships {
  name: string;
  url: string;
}

const StarshipsList: React.FC = () => {
  const [starships, setStarships] = useState<Starships[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/starships/');
      const data = await res.json();
      setStarships(data.results);
    }
    fetchData();
  }, []);

  const getStarshipId = (url: string) => {
    const id = url.split('/')[5];
    return id;
  }

  return (
    <div>
      <p>Number of starships: {starships ? starships.length : 'Loading...'}</p>
      {starships ? (
        <ul>
          {starships.map((starship) => (
            <li key={starship.name}>
            <Link href="/starships/[id]" as={`/starships/${getStarshipId(starship.url)}`}>
              {starship.name}
            </Link>
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default StarshipsList;
