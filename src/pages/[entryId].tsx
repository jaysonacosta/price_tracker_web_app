import { type NextPage } from "next";

import { useRouter } from "next/router";
import Head from "next/head";

import { trpc } from "../utils/trpc";

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

const EntryPage: NextPage = () => {
  const router = useRouter();
  const { data: prices, isLoading } = trpc.prices.getPricesById.useQuery(
    {
      id: router.query.entryId as string,
    },
    { enabled: router.isReady }
  );
  const labels = prices?.map((entry) => {
    return Intl.DateTimeFormat("en-US").format(entry.date);
  });

  const graphData = {
    labels,
    datasets: [
      {
        label: "Dataset",
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
        <title>Price Tracker</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="p-5">{!isLoading && <Line data={graphData} />}</main>
    </>
  );
};

export default EntryPage;
