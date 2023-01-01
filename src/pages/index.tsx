import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: entries, isLoading } = trpc.entries.getAll.useQuery();
  console.log(entries);
  return (
    <>
      <Head>
        <title>Price Tracker</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-stone-200">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {!isLoading &&
            entries?.map((entry) => {
              return <div key={entry.id}>{entry.title}</div>;
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
