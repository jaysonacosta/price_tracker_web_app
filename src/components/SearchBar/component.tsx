import React, { useState } from "react";

import Search from "../icons/Search";
import { trpc } from "../../utils/trpc";
import Tooltip from "../Tooltip";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isValid, setValidity] = useState(false);
  const utils = trpc.useContext();
  const { mutate } = trpc.urls.postUrl.useMutation({
    onSuccess() {
      setTimeout(() => utils.entries.getAll.invalidate(), 5000);
    },
  });

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
      setQuery("");
      setValidity(false);
    }
  };

  return (
    <div className="flex gap-x-2">
      <Tooltip message="URL is invalid." visible={!isValid && query.length > 0}>
        <input
          type="text"
          placeholder="https://www.amazon.com/"
          className={`${
            !isValid && query.length > 0 ? "focus:outline-red-300" : null
          } h-full w-full rounded p-3 font-semibold`}
          value={query}
          onChange={(e) => updateQuery(e.target.value)}
        />
      </Tooltip>
      <button className="rounded bg-slate-200 p-3" onClick={submit}>
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
