import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import NavigationButtons from "./NavigationButtons";
import axios from "axios";
import BackToHome from "./BackToHome";

interface Props {
  url: string;
  getId: (url: string) => string;
  getImage: (id: string, name: string) => string;
  category: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
}

interface Element {
	title: string;
  name: string;
  url: string;
  hasDefaultImage: boolean;
  image: string;
}

const DataList: React.FC<Props> = ({
  url,
  getId,
  getImage,
  category,
  setUrl,
}) => {
  const [data, setData] = useState<any>(null);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [previousUrl, setPreviousUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function checkImageExists(imageUrl: string) {
    try {
      const res = await axios.head(imageUrl);
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const data = await res.json();
      const updatedData = await Promise.all(
        data.results.map(async (element: Element) => {
					let title = element.name;
					if (element.title) {
							title = element.title;
					}
          const hasDefaultImage = element.name === "unknown";
          const image = getImage(getId(element.url), element.name);
          const imageExists = await checkImageExists(image);
          return {
            ...element,
						title	: element.title ? element.title : element.name,
            hasDefaultImage: hasDefaultImage || !imageExists,
            image: imageExists ? image : "https://starwars-visualguide.com/assets/img/placeholder.jpg"
          };
        })
      );
      setData(updatedData);
      setNextUrl(data.next);
      setPreviousUrl(data.previous);
      setIsLoading(false);
    }
    fetchData();
  }, [url, getId, getImage]);

  return (
    <div>
      <BackToHome />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>
            Number of {category}: {data ? data.length : "Loading..."}
          </p>
          {data ? (
            <ul>
              {data.map((element: Element, index: number) => (
                // key can be element.name or element.title
                <li key={element.title}>
                  <Link
                    href={`/${category}/[id]`}
                    as={`/${category}/${getId(element.url)}`}
                  >
                    {element.title}
                  </Link>
                    <Image
                      src={element.image}
                      alt={element.title}
                      width={200}
                      height={200}
                    />
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
					<NavigationButtons nextUrl={nextUrl} previousUrl={previousUrl} setUrl={setUrl} />
        </div>
      )}
    </div>
  );
};

export default DataList;
