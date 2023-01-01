import React from "react";
import Image from "next/image";

type Props = {
  title: string;
  image: string;
  date: Date;
};

const Entry: React.FC<Props> = ({ title, image, date }) => {
  return (
    <div className="relative flex h-full cursor-pointer gap-x-5 rounded bg-slate-200 p-5 shadow duration-300 ease-in-out hover:shadow-lg">
      <Image src={image} alt={title} height={100} width={100} />

      <div className="flex flex-col">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-neutral-500">
          {Intl.DateTimeFormat("en-US").format(date)}
        </span>
      </div>
    </div>
  );
};

export default Entry;
