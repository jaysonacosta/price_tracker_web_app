import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  date: Date;
};

const Entry: React.FC<Props> = ({ title, image, date }) => {
  return (
    <div className="flex h-full w-full cursor-pointer gap-x-5 rounded bg-slate-200 p-5 shadow duration-300 ease-in-out hover:shadow-lg">
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
    </div>
  );
};

export default Entry;
