import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Species {
  name: string;
}

const SpeciesList: React.FC = () => {
  const [species, setSpecies] = useState<Species[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/species');
      const data = await res.json();
      setSpecies(data.results);
      console.log(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Number of species: {species ? species.length : 'Loading...'}</p>
      {species ? (
        <ul>
          {species.map((specie, index) => (
            <li key={specie.name}>
            <Link href="/species/[id]" as={`/species/${index + 1}`}>
              {specie.name}
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

export default SpeciesList;
