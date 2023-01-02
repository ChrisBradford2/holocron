import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import slugify from "react-slugify";

interface PlanetIdProps {
  planets: {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
		url: string;
  };
}

interface Resident {
	name: string;
}

const PlanetId: NextPage<PlanetIdProps> = ({ planets }) => {
  return (
    <div>
      <Link href="/planets/" as={`/planets/`}>
        Back to the planets list
      </Link>
      <h1>{planets.name}</h1>
				<p>Id: {planets.url}</p>
        <p>Rotation period: {planets.rotation_period}</p>
        <p>Orbital period: {planets.orbital_period}</p>
        <p>Diameter: {planets.diameter}</p>
				<p>Climate: {planets.climate}</p>
				<p>Gravity: {planets.gravity}</p>
				<p>Terrain: {planets.terrain}</p>
				<p>Surface water: {planets.surface_water}</p>
				<p>Population: {planets.population}</p>
				{planets.residents.length > 0 ? (
					<>
						<h3>Residents :</h3>
						<ul>
							{planets.residents.map((resident, index) => (
								<li key={index}>
									{resident}
								</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no residents.</p>
				)}
				{planets.films.length > 0 ? (
					<>
						<h3>Films :</h3>
						<ul>
							{planets.films.map((film, index) => (
								<li key={index}>{film}</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no films.</p>
				)}
    </div>
  );
};

PlanetId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/planets/${id}`);
  const data = await res.json();

	// Get the residents id from the url
	const residentsId = [];
	for (let i = 0; i < data.residents.length; i++) {
		const url = data.residents[i];
		const urlArray = url.split('/');
		const idFromUrl = urlArray[urlArray.length - 2];
		residentsId.push(idFromUrl);
	}

	// Get the residents data
	const residentData = [];
	for (let i = 0; i < data.residents.length; i++) {
		const res = await fetch(data.residents[i]);
		const resident = await res.json();
		residentData.push(resident.name);
	}
	data.residents = residentData;

	// Get the films data
	const films = [];
	for (let i = 0; i < data.films.length; i++) {
		const res = await fetch(data.films[i]);
		const film = await res.json();
		films.push(film.title);
	}
	data.films = films;

	// Get the id from the url
	const url = data.url;
	const urlArray = url.split('/');
	const idFromUrl = urlArray[urlArray.length - 2];
	data.url = idFromUrl;

  return { planets: data };
};

export default PlanetId;
