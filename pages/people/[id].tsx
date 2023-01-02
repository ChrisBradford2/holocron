import React from "react";
import { NextPage } from "next";
import Link from "next/link";

interface PersonIdProps {
  person: {
    id: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
  };
}

const PersonId: NextPage<PersonIdProps> = ({ person }) => {
  return (
    <div>
      <Link href="/people/" as={`/people/`}>
        Back to the people list
      </Link>
      <h1>{person.name}</h1>
      <p>Taille : {person.height} cm</p>
      <p>Poids : {person.mass} Kg</p>
      <p>Couleur de cheveux : {person.hair_color}</p>
      <p>Couleur de peau : {person.skin_color}</p>
      <p>Couleur des yeux : {person.eye_color}</p>
      <p>Année de naissance : {person.birth_year}</p>
      <p>Genre: {person.gender}</p>
      <p>Planète d&apos;origine: {person.homeworld}</p>
      {person.films.length > 0 ? (
				<>
					<h3>Films :</h3>
					<ul>
						{person.films.map((film, index) => (
							<li key={index}>{film}</li>
						))}
					</ul>
				</>
			) : (
				<p>Ce personnage n&apos;a pas de films.</p>
			)}
			{person.species.length > 0 ? (
				<>
					<h3>Espèces :</h3>
					<ul>
						{person.species.map((specie, index) => (
							<li key={index}>{specie}</li>
						))}
					</ul>
				</>
			) : (
				<p>Ce personnage n&apos;a pas d&apos;espèces.</p>
			)}
      {person.vehicles.length > 0 ? (
        <>
          <h3>Véhicules :</h3>
          <ul>
            {person.vehicles.map((vehicle, index) => (
              <li key={index}>{vehicle}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Ce personnage n&apos;a pas de véhicule.</p>
      )}
			{person.starships.length > 0 ? (
				<>
					<h3>Vaisseau :</h3>
					<ul>
						{person.starships.map((starship, index) => (
							<li key={index}>{starship}</li>
						))}
					</ul>
				</>
			) : (
				<p>Ce personnage n&apos;a pas de vaisseaux.</p>
			)}
    </div>
  );
};

PersonId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/people/${id}`);
  const data = await res.json();

  // Get the planet name
  const planetRes = await fetch(data.homeworld);
  const planetData = await planetRes.json();
  data.homeworld = planetData.name;

  // Get vehicle data
  const vehicles = [];
  for (const vehicleUrl of data.vehicles) {
    const vehicleRes = await fetch(vehicleUrl);
    const vehicleData = await vehicleRes.json();
    vehicles.push(vehicleData.name);
  }
  data.vehicles = vehicles;

	// Get film data
	const films = [];
	for (const filmUrl of data.films) {
		const filmRes = await fetch(filmUrl);
		const filmData = await filmRes.json();
		films.push(filmData.title);
	}
	data.films = films;

	// Get specie data
	const species = [];
	for (const specieUrl of data.species) {
		const specieRes = await fetch(specieUrl);
		const specieData = await specieRes.json();
		species.push(specieData.name);
	}
	data.species = species;

	// Get starship data
	const starships = [];
	for (const starshipUrl of data.starships) {
		const starshipRes = await fetch(starshipUrl);
		const starshipData = await starshipRes.json();
		starships.push(starshipData.name);
	}
	data.starships = starships;

  return { person: data };
};

export default PersonId;
