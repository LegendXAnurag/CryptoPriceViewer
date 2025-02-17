
  import axios from "axios";
  import { useState, useEffect } from "react";
  import { FiRefreshCw } from "react-icons/fi";
  import SearchedItem from "./SearchedItem";

  export default function SearchResults({ query, currency }) {
    const [allCoins, setAllCoins] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [visibleCount, setVisibleCount] = useState(50);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [previousData, setPreviousData] = useState([]);
    const [lastRefreshTime, setLastRefreshTime] = useState(0);

    useEffect(() => {
      fetchData();
    }, [currency]);

    useEffect(() => {
      filterCoins();
    }, [query, allCoins]);

    const fetchData = async () => {
      const now = Date.now();
      if (now - lastRefreshTime < 3000) {
        alert("Refreshing too quickly! Please wait.");
        return;
      }

      setIsRefreshing(true);
      setLastRefreshTime(now);

      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=250&page=1`;

      try {
        const res = await axios.get(url
          // +`&x_cg_demo_api_key=${import.meta.env.VITE_TOKEN}`
          
        );
        setPreviousData(allCoins);
        setAllCoins(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }

      setTimeout(() => setIsRefreshing(false), 1000);
    };

    const filterCoins = () => {
      let results = allCoins;
      if (query) {
        const lowerCaseQuery = query.toLowerCase();
        results = allCoins.filter(
          (coin) =>
            coin.id.toLowerCase().includes(lowerCaseQuery) ||
            coin.symbol.toLowerCase().includes(lowerCaseQuery) ||
            coin.name.toLowerCase().includes(lowerCaseQuery)
        );
      }
      setFilteredResults(results);
      setVisibleCount(50);
    };

    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Refresh Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={fetchData}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <FiRefreshCw className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Header Row */}
        <div className="flex flex-wrap items-center text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 px-2 py-4 md:px-4 font-medium text-base sm:text-base rounded-t-lg">
          <div className="w-1/12 sm:w-[5%]">Rank</div>
          <div className="w-5/12 sm:w-[25%]">Coin</div>
          <div className="w-3/12 sm:w-[15%]">Price</div>
          <div className="hidden sm:block w-[20%]">Market Cap</div>
          <div className="hidden sm:block w-[20%]">Total Volume</div>
          <div className="w-3/12 sm:w-[15%]">24h Change</div>
        </div>

        {/* Search Results */}
        <div className="bg-white dark:bg-gray-900 rounded-b-lg shadow-md overflow-hidden">
          {filteredResults.slice(0, visibleCount).map((coin) => (
            <SearchedItem key={coin.id} coin={coin} currency={currency} previousData={previousData} />
          ))}
        </div>

        {/* Load More / Less Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          {visibleCount < filteredResults.length && (
            <button
              onClick={() => setVisibleCount((prev) => Math.min(prev + 50, filteredResults.length))}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Load More
            </button>
          )}

          {visibleCount > 50 && (
            <button
              onClick={() => setVisibleCount((prev) => Math.max(50, prev - 50))}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    );
  }
