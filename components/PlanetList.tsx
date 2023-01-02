import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Planet {
  name: string;
}

const PlanetList: React.FC = () => {
  const [planets, setPlanet] = useState<Planet[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/planets?page=1');
      const data = await res.json();
      setPlanet(data.results);
    }
    fetchData();
  }, []);

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
    </div>
  );
}

export default PlanetList;
