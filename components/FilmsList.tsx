import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Films {
  title: string;
}

const FilmsList: React.FC = () => {
  const [films, setFilms] = useState<Films[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/films');
      const data = await res.json();
      setFilms(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Number of films: {films ? films.length : 'Loading...'}</p>
      {films ? (
        <ul>
          {films.map((film, index) => (
            <li key={film.title}>
            <Link href="/films/[id]" as={`/films/${index + 1}`}>
              {film.title}
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

export default FilmsList;
