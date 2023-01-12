import Image from "next/image";
import React from "react";

import { trpc } from "../../utils/trpc";

type Props = {
  title: string;
  image: string;
  date: Date;
  id: string;
};

const Entry: React.FC<Props> = ({ title, image, date, id }) => {
  const utils = trpc.useContext();

  const { mutate: mutateEntries } = trpc.entries.deleteEntryById.useMutation({
    onSuccess: () => utils.entries.getAll.invalidate(),
  });
  const { mutate: mutatePrices } =
    trpc.prices.deletePricesByEntryId.useMutation();

  const deleteEntry = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    mutateEntries({ id });
    mutatePrices({ id });
  };

  return (
    <div className="group relative flex h-full w-full cursor-pointer gap-x-5 rounded bg-slate-200 p-5 shadow duration-300 ease-in-out hover:shadow-lg">
      <div className="relative h-32 min-w-[128px] rounded bg-white">
        <Image
          src={image}
          alt={title}
          fill={true}
          className="object-contain p-2"
        />
      </div>

      <div className="flex flex-col overflow-hidden">
        <span className="text-lg font-semibold line-clamp-2">{title}</span>
        <span className="text-neutral-500">
          Tracking since: {Intl.DateTimeFormat("en-US").format(date)}
        </span>
      </div>

      <div
        onClick={deleteEntry}
        className="absolute top-2 -left-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-300 opacity-0 duration-300 ease-in-out hover:scale-110 hover:bg-red-400 group-hover:-top-2 group-hover:opacity-100"
      >
        &#10005;
      </div>
    </div>
  );
};

export default Entry;
