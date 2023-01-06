import React, { useState } from "react";
import Search from "../icons/Search";
import { trpc } from "../../utils/trpc";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isValid, setValidity] = useState(false);

  const { mutate, data } = trpc.urls.postUrl.useMutation();

  const updateQuery = (input: string) => {
    validation(input);
    setQuery(input);
  };

  const validation = (input: string) => {
    const match = input.match(/^(https:\/\/www\.amazon\.com\/){1}.+/);
    if (match) {
      setValidity(true);
      return;
    }
    setValidity(false);
  };

  const submit = () => {
    if (isValid) {
      mutate({ url: query });
    }
  };

  return (
    <div className="flex gap-x-2">
      <input
        type="text"
        placeholder="https://www.amazon.com/"
        className={`${
          !isValid && query.length > 0
            ? "border-4 border-red-400"
            : "border-none"
        } w-full rounded p-3 font-semibold`}
        onChange={(e) => updateQuery(e.target.value)}
      />
      <button className="rounded bg-slate-200 p-3" onClick={submit}>
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
