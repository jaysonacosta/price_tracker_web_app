import React from "react";
import type { prices } from "@prisma/client";

type Props = {
  prices: prices[];
};

const PriceTable: React.FC<Props> = ({ prices }) => {
  return (
    <table className="h-full w-full table-auto overflow-hidden rounded bg-neutral-200 shadow">
      <thead className="border-b-2 border-neutral-300">
        <tr>
          <th className="p-2 text-left">Date</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left">Change</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((entry, idx) => {
          const difference =
            idx != 0
              ? Number(entry.price.replace(/[^0-9.-]+/g, "")) -
                Number(prices[idx - 1]?.price.replace(/[^0-9.-]+/g, ""))
              : 0;

          return (
            <tr key={entry.id} className="even:bg-neutral-300">
              <td className="p-2">
                {Intl.DateTimeFormat("en-US").format(entry.date)}
              </td>
              <td className="p-2">{entry.price}</td>
              <td
                className={`${
                  difference === 0
                    ? "text-black"
                    : difference < 0
                    ? "text-green-800"
                    : "text-red-800"
                } p-2`}
              >
                {Math.abs(difference).toFixed(2)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default PriceTable;
