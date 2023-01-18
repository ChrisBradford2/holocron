import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import slugify from "react-slugify";

interface StarshipsIdProps {
	starships: {
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
		hyperdrive_rating: string;
		MGLT: string;
		starship_class: string;
		pilots: string[];
		films: string[];
	};
}

const StarshipsId: NextPage<StarshipsIdProps> = ({ starships }) => {
  return (
    <div>
      <Link href="/starships/" as={`/starships/`}>
        Back to the starships list
      </Link>
      <h1>{starships.name}</h1>
	  <p>Model : {starships.model}</p>
	  <p>Manufacturer : {starships.manufacturer}</p>
	  <p>Cost in credits : {starships.cost_in_credits}</p>
	  <p>Length : {starships.length}</p>
	  <p>Max atmosphering speed : {starships.max_atmosphering_speed}</p>
	  <p>Crew : {starships.crew}</p>
	  <p>Passengers : {starships.passengers}</p>
	  <p>Cargo capacity : {starships.cargo_capacity}</p>
	  <p>Consumables : {starships.consumables}</p>
	  <p>starship class : {starships.starship_class}</p>
	  {starships.pilots.length > 0 ? (
		  <>
		  <h3>Pilots :</h3>
		  <ul>
			  {starships.pilots.map((pilot, index) => (
				  <li key={index}>
					  {pilot}
				  </li>
			  ))}
		</ul>
		</>
	  ) : (
		  <p>No pilots</p>
	  )}
	  {starships.films.length > 0 ? (
		  <>
		  <h3>Films :</h3>
		  <ul>
			  {starships.films.map((film, index) => (
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

StarshipsId.getInitialProps = async function (context) {
  const id = context.query.id;
  const res = await fetch(`https://swapi.dev/api/starships/${id}`);
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

  return { starships: data };
};

export default StarshipsId;
