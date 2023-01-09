import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import slugify from "react-slugify";
import Footer from "../../components/Footer";
import Head from "next/head";

interface FilmsIdProps {
  films: {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: string[];
	planets: string[];
	starships: string[];
	vehicles: string[];
	species: string[];
  };
}

const FilmsId: NextPage<FilmsIdProps> = ({ films }) => {
  return (
    <div>
		<Head>
        <title>Holocron - {films.title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href="/films/" as={`/films/`}>
        Back to the films list
      </Link>
	  <h1>{films.title}</h1>
	  <p>Episode: {films.episode_id}</p>
	  <p>Opening crawl: {films.opening_crawl}</p>
	  <p>Director: {films.director}</p>
	  <p>Producer: {films.producer}</p>
	  <p>Release date: {films.release_date}</p>
	{films.characters.length > 0 ? (
					<>
						<h3>Characters :</h3>
						<ul>
							{films.characters.map((character, index) => (
								<li key={index}>
									{character}
								</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no characters.</p>
				)}

	  {films.planets.length > 0 ? (
					<>
						<h3>Planets :</h3>
						<ul>
							{films.planets.map((planet, index) => (
								<li key={index}>
									{planet}
								</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no planets.</p>
				)}
				{films.starships.length > 0 ? (
					<>
						<h3>Starships :</h3>
						<ul>
							{films.starships.map((starship, index) => (
								<li key={index}>
									{starship}
								</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no starships.</p>
				)}
				{films.vehicles.length > 0 ? (
					<>
						<h3>Vehicles :</h3>
						<ul>
							{films.vehicles.map((vehicle, index) => (
								<li key={index}>
									{vehicle}
								</li>
							))}
						</ul>
					</>
				) : (
					<p>This planet has no vehicles.</p>
				)}
				{films.species.length > 0 ? (
					<>
						<h3>Species :</h3>
						<ul>
							{films.species.map((specie, index) => (
								<li key={index}>
									{specie}
								</li>
							))}
						</ul>
					</>
					) : (
						<p>This planet has no species.</p>
					)}

	<Footer />
    </div>
  );
};

FilmsId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/films/${id}`);
  const data = await res.json();

	// Get the id from the url
	const url = data.url;
	const urlArray = url.split('/');
	const idFromUrl = urlArray[urlArray.length - 2];
	data.url = idFromUrl;

	// Get the characters data
	const characterData = [];
	for (let i = 0; i < data.characters.length; i++) {
		const res = await fetch(data.characters[i]);
		const character = await res.json();
		characterData.push(character.name);
	}
	data.characters = characterData;

	// Get the planets data
	const planetData = [];
	for (let i = 0; i < data.planets.length; i++) {
		const res = await fetch(data.planets[i]);
		const planet = await res.json();
		planetData.push(planet.name);
	}
	data.planets = planetData;

	// Get the starships data
	const starshipData = [];
	for (let i = 0; i < data.starships.length; i++) {
		const res = await fetch(data.starships[i]);
		const starship = await res.json();
		starshipData.push(starship.name);
	}
	data.starships = starshipData;

	// Get the vehicles data
	const vehicleData = [];
	for (let i = 0; i < data.vehicles.length; i++) {
		const res = await fetch(data.vehicles[i]);
		const vehicle = await res.json();
		vehicleData.push(vehicle.name);
	}
	data.vehicles = vehicleData;

	// Get the species data
	const specieData = [];
	for (let i = 0; i < data.species.length; i++) {
		const res = await fetch(data.species[i]);
		const specie = await res.json();
		specieData.push(specie.name);
	}
	data.species = specieData;

  return { films: data };
};

export default FilmsId;