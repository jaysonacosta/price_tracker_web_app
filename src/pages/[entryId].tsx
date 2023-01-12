import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { trpc } from "../utils/trpc";
import Spinner from "../components/icons/Spinner";
import PreviousPage from "../components/PreviousPage";

const EntryPage: NextPage = () => {
  const { query, isReady } = useRouter();

  const {
    data: prices,
    isLoading,
    isError,
  } = trpc.prices.getPricesById.useQuery(
    {
      id: query.entryId as string,
    },
    { enabled: isReady }
  );

  const { data: entry } = trpc.entries.getEntryById.useQuery(
    {
      id: query.entryId as string,
    },
    { enabled: isReady }
  );

  const labels = prices?.map((entry) => {
    return Intl.DateTimeFormat("en-US").format(entry.date);
  });

  const graphData = {
    labels,
    datasets: [
      {
        label: "Price",
        data: prices
          ? prices.map((entry) => {
              return Number(entry.price.replace(/[^0-9.-]+/g, ""));
            })
          : [],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = { plugins: { legend: { display: false } } };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      <Head>
        <title>{`Price Tracker${entry ? ` | ${entry.title}` : ""}`}</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">
        <PreviousPage />
        <br />
        {isLoading && (
          <div className="flex items-center justify-center">
            <Spinner color="#60a5fa" spin={true} />
          </div>
        )}
        {isError && <div>Uh oh... something went wrong.</div>}
        {entry && (
          <>
            <div className="flex gap-x-5">
              <div className="relative min-h-[128px] min-w-[128px] rounded bg-white">
                <Image
                  src={entry.image}
                  fill={true}
                  alt={entry.title}
                  className="object-contain p-2"
                />
              </div>

              <div>
                <h1 className="text-3xl font-bold line-clamp-3 md:line-clamp-2">
                  {entry.title}
                </h1>
                <span>
                  <Link href={entry.url} className="text-blue-500">
                    Amazon link
                  </Link>
                </span>
              </div>
            </div>
            <br />
            <hr />
            <br />
            <Line data={graphData} options={options} />
          </>
        )}
      </main>
    </>
  );
};

export default EntryPage;
