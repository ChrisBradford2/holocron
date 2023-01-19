import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import NavigationButtons from "./NavigationButtons";
import axios from "axios";

interface Props {
    url: string;
    getId: (url: string) => string;
    getImage: (id: string, name: string) => string;
    category: string;
    setUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface Element {
    name: string;
    url: string;
    hasDefaultImage: boolean;
    image: string;
}

const DataList: React.FC<Props> = ({ url, getId, getImage, category, setUrl }) => {
    const [data, setData] = useState<any>(null);
    const [nextUrl, setNextUrl] = useState<string | null>(null);
    const [previousUrl, setPreviousUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(url);
            const data = await res.json();
            setData(
                data.results.map((element: Element) => ({
                    ...element,
                    hasDefaultImage: element.name === "unknown",
                    image: getImage(getId(element.url), element.name)
                }))
            );
            setNextUrl(data.next);
            setPreviousUrl(data.previous);
            setIsLoading(false);
        }
        fetchData();
    }, [url]);
    

    return (
        <div>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Number of {category}: {data ? data.length : 'Loading...'}</p>
                    {data ? (
                        <ul>
                            {data.map((element: Element, index: number) => (
                                <li key={element.name}>
                                    <Link href={`/${category}/[id]`} as={`/${category}/${getId(element.url)}`}>
                                        {element.name}
                                    </Link>
                                    {!element.hasDefaultImage ? (
                                        <Image
                                            src={element.image}
                                            alt={element.name}
                                            width={200}
                                            height={200}
                                            onError={() => {
                                                setData((prevData: Element[]) => {
                                                    const newData = [...prevData];
                                                    newData[index].hasDefaultImage = true;
                                                    return newData;
                                                });
                                            }}
                                        />
                                    ) : (
                                        <p>Image not found</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        'Loading...'
                    )}
                </div>
            )}
        </div>
    );
}

export default DataList;
