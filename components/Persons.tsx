import React, { useState, useEffect } from 'react';

interface People {
  name: string;
  height: string;
  films: string[];
}

interface Film {
  title: string;
}

const Persons: React.FC = () => {
  const [people, setPeople] = useState<People[] | null>(null);
  const [films, setFilms] = useState<Film[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/people/');
      const data = await res.json();
      setPeople(data.results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchFilms() {
      if (people) {
        const filmPromises = people[0].films.map(async film => {
          const res = await fetch(film);
          const data = await res.json();
          return data;
        });
        const films = await Promise.all(filmPromises);
        setFilms(films);
      }
    }
    fetchFilms();
  }, [people]);

  return (
    <div>
      {people ? (
        <ul>
          {people.map(person => (
            <li key={person.name}>
              <h1>{person.name}</h1>
              <p>Height: {person.height}</p>
              <p>Films:</p>
              <ul>
                {films ? (
                  films.map(film => (
                    <li key={film.title}>{film.title}</li>
                  ))
                ) : (
                  'Loading...'
                )}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        'Loading...'
      )}
    </div>
  );
}

export default Persons;
