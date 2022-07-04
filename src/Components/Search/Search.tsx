import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/globalServices";

export const Search = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  const { handleSubmitSearch } = useSearch();

  return (
    <div className="bg-gray-200 border-b-4 border-zinc-300">
      <div className="m-auto max-w-6xl flex items-center justify-between">
        <Link to="/" className="border-b-4 border-teal-600 p-6 font-medium">
          Home
        </Link>
        <form
          className="p-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitSearch(ref.current?.value);
          }}
        >
          <label className="text-sm font-medium mr-4">
            Search:
            <input
              ref={ref}
              type="text"
              placeholder="aisflat439"
              className="bg-transparent ml-4 placeholder:font-light"
            />
          </label>
          <button
            type="submit"
            className="bg-teal-600 py-2 px-6 rounded-full text-white font-medium"
          >
            Search for a Github user
          </button>
        </form>
      </div>
    </div>
  );
};
