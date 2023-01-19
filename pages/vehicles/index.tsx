import Head from "next/head";
import { useState } from "react";
import DataList from "../../components/DataList";


const Vehicles:React.FC = () => {
    const [url, setUrl] = useState<string>("https://swapi.dev/api/vehicles/?page=");
    const getId = (url: string) => {
        const id = url.split('/')[5];
        return id;
    }
    const getImage = (id: string, name: string) => {
        const image = `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
        return image;
    }

    return (
        <div>
            <Head>
                <title>Vehicles</title>
                <meta name="description" content="Vehicles" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1>Vehicles</h1>
            <DataList
                url={url}
                getId={getId}
                getImage={getImage}
                category='vehicles'
                setUrl={setUrl}
            />
        </div>
    )
}

export default Vehicles;
