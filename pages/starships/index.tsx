import Head from "next/head";
import { useState } from "react";
import BackToHome from "../../components/BackToHome";
import DataList from "../../components/DataList";


const Starships: React.FC = () => {
    const [url, setUrl] = useState<string>("https://swapi.dev/api/starships/?page=");
    const getId = (url: string) => {
        const id = url.split('/')[5];
        return id;
    }
    const getImage = (id: string, name: string) => {
        const image = `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
        return image;
    }

    return (
        <div>
            <Head>
                <title>Starships</title>
                <meta name="description" content="Starships" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Starships</h1>
            <DataList 
                url={url}
                getId={getId}
                getImage={getImage}
                category='starships'
                setUrl={setUrl}
            />
        </div>
    )
}

export default Starships;
