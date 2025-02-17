import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactApexChart from 'react-apexcharts';

const Coin = ({ currency }) => {
  const { coin } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [priceChartData, setPriceChartData] = useState([]);
  const [candlestickData, setCandlestickData] = useState([]);
  const [priceDays, setPriceDays] = useState(7);
  const [ohlcDays, setOhlcDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [priceChartLoading, setPriceChartLoading] = useState(false);
  const [ohlcChartLoading, setOhlcChartLoading] = useState(false);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
  });

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        setLoading(true);
        const marketRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coin}`
        );
        setCoinData(marketRes.data[0]);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coin, currency]);

  useEffect(() => {
    const fetchPriceChartData = async () => {
      try {
        setPriceChartLoading(true);
        const chartRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${priceDays}`
        );
        setPriceChartData(
          chartRes.data.prices.map(([timestamp, price]) => ({
            x: new Date(timestamp).getTime(),
            y: price,
          }))
        );
      } catch (error) {
        console.error("Error fetching price chart data:", error);
      } finally {
        setPriceChartLoading(false);
      }
    };

    fetchPriceChartData();
  }, [coin, currency, priceDays]);

  useEffect(() => {
    const fetchOhlcData = async () => {
      try {
        setOhlcChartLoading(true);
        const ohlcRes = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}/ohlc?vs_currency=${currency}&days=${ohlcDays}`
        );
        setCandlestickData(
          ohlcRes.data.map(([timestamp, open, high, low, close]) => ({
            x: new Date(timestamp).getTime(),
            y: [open, high, low, close]
          }))
        );
      } catch (error) {
        console.error("Error fetching OHLC data:", error);
      } finally {
        setOhlcChartLoading(false);
      }
    };

    fetchOhlcData();
  }, [coin, currency, ohlcDays]);

  const commonChartOptions = {
    chart: {
      height: 350,
      background: 'transparent',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        style: {
          colors: '#718096',
        }
      }
    },
    yaxis: {
      labels: {
        formatter: (value) => currencyFormatter.format(value),
        style: {
          colors: '#718096',
        }
      }
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (value) => currencyFormatter.format(value)
      }
    },
    grid: {
      borderColor: '#2D3748'
    },
  };

  const priceChartOptions = {
    ...commonChartOptions,
    chart: {
      ...commonChartOptions.chart,
      type: 'line',
    },
    title: {
      text: 'Price History',
      align: 'left',
      style: {
        color: '#718096',
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    colors: ['#4299E1'],
  };

  const candlestickOptions = {
    ...commonChartOptions,
    chart: {
      ...commonChartOptions.chart,
      type: 'candlestick',
    },
    title: {
      text: 'OHLC Chart',
      align: 'left',
      style: {
        color: '#718096',
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#48BB78',
          downward: '#F56565'
        }
      }
    },
    tooltip: {
      ...commonChartOptions.tooltip,
      custom: function({ seriesIndex, dataPointIndex, w }) {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];
        return (
          '<div class="apexcharts-tooltip-box">' +
          '<div>Open: ' + currencyFormatter.format(o) + '</div>' +
          '<div>High: ' + currencyFormatter.format(h) + '</div>' +
          '<div>Low: ' + currencyFormatter.format(l) + '</div>' +
          '<div>Close: ' + currencyFormatter.format(c) + '</div>' +
          '</div>'
        );
      }
    }
  };

  const priceChartSeries = [{
    name: 'Price',
    data: priceChartData
  }];

  const candlestickSeries = [{
    data: candlestickData
  }];

  if (loading) return <div className="text-center p-10 text-xl dark:text-white">Loading...</div>;

  return (
    <div className="p-6 mx-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-[100%] md:w-[100%]">
      {/* Coin Details */}
      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <img src={coinData && coin.image} alt={coinData.name} className="w-16 h-16 mr-4" />
            <div>
              <h1 className="text-3xl font-bold">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-300">
                {currencyFormatter.format(coinData.current_price)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg text-gray-600 dark:text-gray-400">Market Cap Rank: #{coinData.market_cap_rank}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">Market Cap: {currencyFormatter.format(coinData.market_cap)}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">24h Volume: {currencyFormatter.format(coinData.total_volume)}</p>
            <p className={`text-lg font-semibold ${coinData.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              24h Change: {coinData.price_change_percentage_24h.toFixed(2)}%
            </p>
            <p className={`text-lg font-semibold ${coinData.market_cap_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
              Market Cap 24h Change: {coinData.market_cap_change_percentage_24h.toFixed(2)}%
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">All Time High: {currencyFormatter.format(coinData.ath)}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">ATH Date: {new Date(coinData.ath_date).toLocaleDateString()}</p>
            <p className="text-lg text-gray-600 dark:text-gray-400">All Time Low: {currencyFormatter.format(coinData.atl)}</p>
            <p className={`text-lg font-semibold ${coinData.ath_change_percentage >= 0 ? "text-green-500" : "text-red-500"}`}>
              ATH Change %: {coinData.ath_change_percentage.toFixed(2)}%
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="mt-6">
        {/* Price Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 shadow-lg p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Price History</h3>
            <div className="space-x-2">
              {[7, 30, 365].map((d) => (
                <button
                  key={d}
                  onClick={() => setPriceDays(d)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${priceDays === d ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-400 dark:hover:bg-blue-600"}`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          {priceChartLoading ? (
            <div className="h-[350px] flex items-center justify-center">Loading...</div>
          ) : (
            <ReactApexChart options={priceChartOptions} series={priceChartSeries} type="line" height={350} />
          )}
        </div>

        {/* Candlestick Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 shadow-lg p-4 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">OHLC Chart</h3>
            <div className="space-x-2">
              {[7, 30, 365].map((d) => (
                <button
                  key={d}
                  onClick={() => setOhlcDays(d)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${ohlcDays === d ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-blue-400 dark:hover:bg-blue-600"}`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
          {ohlcChartLoading ? (
            <div className="h-[350px] flex items-center justify-center">Loading...</div>
          ) : (
            <ReactApexChart options={candlestickOptions} series={candlestickSeries} type="candlestick" height={350} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;
