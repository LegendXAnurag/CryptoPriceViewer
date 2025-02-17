
import DarkModeButton from "./DarkModeButton.jsx";
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
  const currencies = {
    "aed": "AE", "ars": "AR", "aud": "AU", "bdt": "BD", "bhd": "BH",
    "bmd": "BM", "brl": "BR", "cad": "CA", "chf": "CH", "clp": "CL",
    "cny": "CN", "czk": "CZ", "dkk": "DK", "eur": "EU", "gbp": "GB",
    "gel": "GE", "hkd": "HK", "huf": "HU", "idr": "ID", "ils": "IL",
    "inr": "IN", "jpy": "JP", "krw": "KR", "kwd": "KW", "lkr": "LK",
    "mmk": "MM", "mxn": "MX", "myr": "MY", "ngn": "NG", "nok": "NO",
    "nzd": "NZ", "php": "PH", "pkr": "PK", "pln": "PL", "rub": "RU",
    "sar": "SA", "sek": "SE", "sgd": "SG", "thb": "TH", "try": "TR",
    "twd": "TW", "uah": "UA", "usd": "US", "vef": "VE", "vnd": "VN",
    "zar": "ZA"
  };
  
export default function TitleBar({ currency, setCurrency }) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-20 w-full bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-row items-center justify-between">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-0">
          Crypto Price Tracker
        </h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:gap-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full sm:w-auto"
          >
            <FaHome className="mr-2" />
            Home
          </button>
          <div className="relative w-full sm:w-auto">
            <select
              value={currency}
              onChange={(e)=> {setCurrency(e.target.value); console.log(e)}}
              className="w-full sm:w-auto appearance-none bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 pl-3 pr-10 text-gray-700 dark:text-white leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              {Object.entries(currencies).map(([currencyCode, countryCode]) => (
  <option key={currencyCode} value={currencyCode}>
    {currencyCode.toUpperCase()} - {countryCode}
  </option>
))}
              </select>
<img
  src={`https://flagsapi.com/${currencies[currency]}/flat/64.png`}
  alt={`${currency} flag`}
  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-4 object-cover rounded"
  />
          </div>
          <DarkModeButton />
        </div>
      </div>
    </div>
  );
}
