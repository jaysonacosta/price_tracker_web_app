import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Entry from "../components/Entry";

import { trpc } from "../utils/trpc";

import Spinner from "../components/icons/Spinner";

const Home: NextPage = () => {
  const { data: entries, isLoading, isError } = trpc.entries.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Price Tracker</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <h1 className="text-3xl font-bold">Tracked Items</h1>
        {isLoading && (
          <div className="flex items-center justify-center">
            <Spinner color="#60a5fa" spin={true} />
          </div>
        )}
        {isError && <div>Uh oh... something went wrong.</div>}
        <br />
        <div className="container mx-auto grid grid-cols-2 gap-4">
          {entries &&
            entries.map((entry) => {
              return (
                <Link key={entry.id} href={`/${entry.id}`} className="h-full">
                  <Entry
                    title={entry.title}
                    image={entry.image}
                    date={entry.date}
                  />
                </Link>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
