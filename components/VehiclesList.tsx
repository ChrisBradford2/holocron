import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import NavigationButtons from './NavigationButtons';

interface Vehicles {
  name: string;
  url: string;
}

const VehiclesList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | null>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [url, setUrl] = useState('https://swapi.dev/api/vehicles/?page=');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://swapi.dev/api/vehicles/');
      const data = await res.json();
      setVehicles(data.results);
    }
    fetchData();
  }, []);

  const getVehicleId = (url: string) => {
    const id = url.split('/')[5];
    return id;
  }

  return (
    <div>
      <p>Number of vehicles: {vehicles ? vehicles.length : 'Loading...'}</p>
      {vehicles ? (
        <ul>
          {vehicles.map((vehicle, index) => (
            <li key={vehicle.name}>
            <Link href="/vehicles/[id]" as={`/vehicles/${getVehicleId(vehicle.url)}`}>
              {vehicle.name}
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

export default VehiclesList;
