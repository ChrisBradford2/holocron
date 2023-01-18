import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface People {
  name: string;
  next: string;
  previous: string;
}

const Persons: React.FC = () => {
  const [people, setPeople] = useState<People[] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/people/?page=');
      const data = await res.json();
      setPeople(data.results);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Number of people: {people ? people.length : 'Loading...'}</p>
      {people ? (
        <ul>
          {people.map((person, index) => (
            <li key={person.name}>
            <Link href="/people/[id]" as={`/people/${index + 1}`}>
              {person.name}
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

export default Persons;
