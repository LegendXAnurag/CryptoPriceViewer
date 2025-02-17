
import { memo, useState } from "react";

function SearchBar({ setQuery }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto  bg-gray-900 px-4 py-6 
    sm:py-6 md:py-8
    ">
      {/* my-4 sm:my-6 md:my-8 lg:my-10 */}
      <div className="relative">
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search Cryptocurrency
        </label>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={inputValue}
          onChange={handleInputChange}
          className="block w-full p-4 pl-10 text-sm sm:text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all duration-300 ease-in-out"
          placeholder="Search Cryptocurrency"
        />
        {inputValue && (
          <button
            onClick={() => {
              setInputValue("");
              setQuery("");
            }}
            className="absolute right-2.5 bottom-2.5 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 transition-all duration-300 ease-in-out"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(SearchBar);
