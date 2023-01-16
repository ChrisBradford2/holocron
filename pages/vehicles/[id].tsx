import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import slugify from "react-slugify";

interface VehiclesIdProps {
  vehicles: {
	name: string;
	model: string;
	manufacturer: string;
	cost_in_credits: string;
	length: string;
	max_atmosphering_speed: string;
	crew: string;
	passengers: string;
	cargo_capacity: string;
	consumables: string;
	vehicle_class: string;
	pilots: string[];
	films: string[];
  };
}

const VehiclesId: NextPage<VehiclesIdProps> = ({ vehicles }) => {
  return (
    <div>
      <Link href="/vehicles/" as={`/vehicles/`}>
        Back to the vehicles list
      </Link>
      <h1>{vehicles.name}</h1>
	  <p>Model : {vehicles.model}</p>
	  <p>Manufacturer : {vehicles.manufacturer}</p>
	  <p>Cost in credits : {vehicles.cost_in_credits}</p>
	  <p>Length : {vehicles.length}</p>
	  <p>Max atmosphering speed : {vehicles.max_atmosphering_speed}</p>
	  <p>Crew : {vehicles.crew}</p>
	  <p>Passengers : {vehicles.passengers}</p>
	  <p>Cargo capacity : {vehicles.cargo_capacity}</p>
	  <p>Consumables : {vehicles.consumables}</p>
	  <p>Vehicle class : {vehicles.vehicle_class}</p>
	  {vehicles.pilots.length > 0 ? (
		  <>
		  <h3>Pilots :</h3>
		  <ul>
			  {vehicles.pilots.map((pilot, index) => (
				  <li key={index}>
					  {pilot}
				  </li>
			  ))}
		</ul>
		</>
	  ) : (
		  <p>No pilots</p>
	  )}
	  {vehicles.films.length > 0 ? (
		  <>
		  <h3>Films :</h3>
		  <ul>
			  {vehicles.films.map((film, index) => (
				  <li key={index}>
					  {film}
					</li>
			  ))}
			  </ul>
			  </>
	  ) : (
		  <p>No films</p>
	  )}			
    </div>
  );
};

VehiclesId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/vehicles/${id}`);
  const data = await res.json();

  // Get the pilots names
	const pilotsNames = [];
	for (let i = 0; i < data.pilots.length; i++) {
		const resPilots = await fetch(data.pilots[i]);
		const dataPilots = await resPilots.json();
		pilotsNames.push(dataPilots.name);
	}

	data.pilots = pilotsNames;

	// Get the films names
	const filmsNames = [];
	for (let i = 0; i < data.films.length; i++) {
		const resFilms = await fetch(data.films[i]);
		const dataFilms = await resFilms.json();
		filmsNames.push(dataFilms.title);
	}

	data.films = filmsNames;

  return { vehicles: data };
};

export default VehiclesId;
