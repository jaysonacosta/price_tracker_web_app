import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import Entry from "../components/Entry";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data: entries, isLoading } = trpc.entries.getAll.useQuery();

  return (
    <>
      <Head>
        <title>Price Tracker</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <h1 className="text-3xl font-bold">Tracked Items</h1>
        <br />
        <div className="container mx-auto grid grid-cols-2 gap-4">
          {!isLoading &&
            entries?.map((entry) => {
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
