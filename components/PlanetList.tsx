import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

interface Planet {
  name: string;
}

const PlanetList: React.FC = () => {
  const [planets, setPlanet] = useState<Planet[] | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [url, setUrl] = useState('https://swapi.dev/api/planets/?page=');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setPlanet(data.results);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
    }
    fetchData();
  }, [url]);

  return (
    <div>
      <p>Number of planets: {planets ? planets.length : 'Loading...'}</p>
      {planets ? (
        <ul>
          {planets.map((planet, index) => (
            <li key={planet.name}>
            <Link href="/planets/[id]" as={`/planets/${index + 1}`}>
              {planet.name}
            </Link>
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
      <NavigationButtons nextUrl={nextUrl} previousUrl={previousUrl} setUrl={setUrl} />
    </div>
  );
}

export default PlanetList;
