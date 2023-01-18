import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

interface Species {
  name: string;
}

const SpeciesList: React.FC = () => {
  const [species, setSpecies] = useState<Species[] | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [url, setUrl] = useState('https://swapi.dev/api/species/?page=');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      setSpecies(data.results);
      console.log(data.results);
    }
    fetchData();
  }, [url]);

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
      <NavigationButtons nextUrl={nextUrl} previousUrl={previousUrl} setUrl={setUrl} />
    </div>
  );
}

export default SpeciesList;
