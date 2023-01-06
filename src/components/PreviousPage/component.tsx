import React from "react";
import { useRouter } from "next/router";
import CaretLeft from "../icons/CaretLeft";

const PreviousPage: React.FC = () => {
  const { back } = useRouter();

  return (
    <div
      className="flex w-fit cursor-pointer items-center font-semibold"
      onClick={back}
    >
      <CaretLeft /> Go back
    </div>
  );
};

export default PreviousPage;
