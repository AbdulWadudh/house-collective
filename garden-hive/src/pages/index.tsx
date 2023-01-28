import Head from "next/head";
import Image from "next/image";

import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <>
            <Head>
                <title>Garden</title>
                <meta name="description" content="Welcome to the Garden" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>
                <Navbar />
            </div>
        </>
    );
}
