import Head from "next/head";
import { useState } from "react";
import DataList from "../../components/DataList";


const Planets: React.FC = () => {
    const [url, setUrl] = useState<string>("https://swapi.dev/api/planets/?page=");
    const getId = (url: string) => {
        const id = url.split('/')[5];
        return id;
    }
    const getImage = (id: string, name: string) => {
        const image = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
        return image;
    }

    return (
        <div>
            <Head>
                <title>Planets</title>
                <meta name="description" content="Planets" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Planets</h1>
            <DataList
                url={url}
                getId={getId}
                getImage={getImage}
                category='planets'
                setUrl={setUrl}
            />
        </div>
    )
}

export default Planets;
