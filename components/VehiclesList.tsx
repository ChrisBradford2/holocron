import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

interface Vehicles {
  name: string;
  url: string;
}

const VehiclesList: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicles[] | null>(null);

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
    </div>
  );
}

export default VehiclesList;
