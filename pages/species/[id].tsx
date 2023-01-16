import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import slugify from "react-slugify";

interface SpeciesIdProps {
  species: {
	name: string;
	classification: string;
	designation: string;
	average_height: string;
	skin_colors: string;
	hair_colors: string;
	eye_colors: string;
	average_lifespan: string;
	homeworld: string;
	language: string;
	people: string[];
	films: string[];
  };
}

const SpeciesId: NextPage<SpeciesIdProps> = ({ species }) => {
  return (
    <div>
      <Link href="/species/" as={`/species/`}>
        Back to the species list
      </Link>
      <h1>{species.name}</h1>
		<p>Classification : {species.classification}</p>
		<p>Designation : {species.designation}</p>
		<p>Average height : {species.average_height}</p>
		<p>Skin colors : {species.skin_colors}</p>
		<p>Hair colors : {species.hair_colors}</p>
		<p>Eye colors : {species.eye_colors}</p>
		<p>Average lifespan : {species.average_lifespan}</p>
		<p>Homeworld : {species.homeworld ? species.homeworld : 'This specie have no homeworld.'}</p>
		<p>Language : {species.language}</p>
		{species.people.length > 0 ? (
			<>
				<h3>People :</h3>
				<ul>
					{species.people.map((person, index) => (
						<li key={index}>
							{person}
						</li>
					))}
				</ul>
			</>
		) : (
			<p>This species has no people.</p>
		)}
		{species.films.length > 0 ? (
			<>
				<h3>Films :</h3>
				<ul>
					{species.films.map((film, index) => (
						<li key={index}>
							{film}
						</li>
					))}
				</ul>
			</>
		) : (
			<p>This species has no films.</p>
		)}
    </div>
  );
};

SpeciesId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/species/${id}`);
  const data = await res.json();

	// Get the id from the url
	const url = data.url;
	const urlArray = url.split('/');
	const idFromUrl = urlArray[urlArray.length - 2];
	data.url = idFromUrl;

	// Get the home world name
	if (data.homeworld) {
		const resHomeworld = await fetch(data.homeworld);
		const dataHomeworld = await resHomeworld.json();
		data.homeworld = dataHomeworld.name;
	}

	// Get the people names
	const peopleNames = [];
	for (let i = 0; i < data.people.length; i++) {
		const resPeople = await fetch(data.people[i]);
		const dataPeople = await resPeople.json();
		peopleNames.push(dataPeople.name);
	}
	data.people = peopleNames;

	// Get the films names
	const filmsNames = [];
	for (let i = 0; i < data.films.length; i++) {
		const resFilms = await fetch(data.films[i]);
		const dataFilms = await resFilms.json();
		filmsNames.push(dataFilms.title);
	}

	data.films = filmsNames;

  return { species: data };
};

export default SpeciesId;
