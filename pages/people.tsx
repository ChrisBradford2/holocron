import Head from "next/head";
import BackToHome from "../components/BackToHome";
import Footer from "../components/Footer";
import Persons from "../components/Persons";

const People = () => {
  return (
    <>
      <Head>
        <title>People</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BackToHome />
      <div>
        <h1>People</h1>
        <Persons />
      </div>
      <Footer/>
    </>
  );
};

export default People;
