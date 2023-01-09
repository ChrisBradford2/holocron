import Head from "next/head";
import BackToHome from "../components/BackToHome";
import FilmsList from "../components/FilmsList";
import Footer from "../components/Footer";


const Films = () => {
    return (
        <>
        <Head>
            <title>Films</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <BackToHome />
        <div>
            <h1>Films</h1>
            <FilmsList />
        </div>
        <Footer />
        </>
    );
};

export default Films;
