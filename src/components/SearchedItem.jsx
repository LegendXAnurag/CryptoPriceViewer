import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SearchedItem({ coin, currency, previousData }) {
  const navigate = useNavigate();
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    if (!previousData.length) return;

    const previousCoin = previousData.find((prev) => prev.id === coin.id);
    if (!previousCoin) return;

    if (previousCoin.current_price < coin.current_price) {
      setHighlight("bg-green-200 dark:bg-green-900");
    } else if (previousCoin.current_price > coin.current_price) {
      setHighlight("bg-red-200 dark:bg-red-900");
    }

    setTimeout(() => setHighlight(""), 2000);
  }, [coin.current_price, previousData]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatShortNumber = (num) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div 
      onClick={() => navigate(`/${coin.id}`)}
      className="flex font-medium flex-wrap items-center justify-between text-gray-900 dark:text-white w-full py-4 px-2 md:px-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-150 ease-in-out cursor-pointer"
    >
      <div className="w-1/12 sm:w-[5%] text-center">
        <span className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
          #{coin.market_cap_rank}
        </span>
      </div>

      <div className="w-5/12 sm:w-[25%] flex items-center space-x-2">
        <img src={coin.image} alt={coin.name} className="w-6 h-6" />
        <span className="">{coin.name}</span>
        <span className="text-gray-500 text-sm">({coin.symbol.toUpperCase()})</span>
      </div>

      <div className={`w-3/12 sm:w-[15%] ${highlight}`}>
        {formatCurrency(coin.current_price)}
      </div>

      <div className="hidden sm:block w-[20%]">
        {currency.toUpperCase()} {formatShortNumber(coin.market_cap)}
      </div>

      <div className="hidden sm:block w-[20%]">
        {currency.toUpperCase()} {formatShortNumber(coin.total_volume)}
      </div>

      <div className={`w-2/12 sm:w-[15%] ${coin.price_change_percentage_24h > 0 ? "text-green-500" : "text-red-500"}`}>
        {coin.price_change_percentage_24h > 0 ? "+" : ""}
        {coin.price_change_percentage_24h!==null && coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
}

export default SearchedItem;
