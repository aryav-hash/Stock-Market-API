import React, { useState, useEffect } from 'react'

function App() {

  const [stockData, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStock = async() => {
      setLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/stock/${symbol}`);
        const data = await res.json();
        setStockData(data);
      } catch(err) {
        console.error("Failed to fetch stock data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-6">Stock Price Viewer</h1>
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          className="mb-4 p-2 border border-gray-300 rounded w-48 text-center"
          placeholder="Enter stock symbol"
        />

        <div className="bg-white shadow-md rounded p-6 w-80 text-center">
          {loading ? (
            <p>Loading...</p>
          ) : stockData && stockData.c ? (
            <>
              <h2 className="text-xl font-semibold mb-4">{symbol}</h2>
              <p>Current Price: ${stockData.c}</p>
              <p>Open: ${stockData.o}</p>
              <p>High: ${stockData.h}</p>
              <p>Low: ${stockData.l}</p>
            </>
          ) : (
            <p>Enter a valid stock symbol</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App
