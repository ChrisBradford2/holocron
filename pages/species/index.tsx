import Head from "next/head";
import BackToHome from "../../components/BackToHome";
import SpeciesList from "../../components/SpeciesList";
import { useState } from "react";
import DataList from "../../components/DataList";


const Species: React.FC = () => {
    const [url, setUrl] = useState<string>("https://swapi.dev/api/species/?page=");
    const getId = (url: string) => {
        const id = url.split('/')[5];
        return id;
    }
    const getImage = (id: string, name: string) => {
        const image = `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
        return image;
    }

    return (
        <div>
            <Head>
                <title>Species</title>
                <meta name="description" content="Species" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Species</h1>
            <DataList
                url={url}
                getId={getId}
                getImage={getImage}
                category='species'
                setUrl={setUrl}
            />
        </div>
    )
}

export default Species;
