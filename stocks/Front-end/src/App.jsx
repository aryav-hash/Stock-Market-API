import { useState, useEffect } from 'react'
import axios from 'axios'

/* 
  {
    array.map((user, index) => (
      <div key={index}>
        <span> {user} </span><br/>
      </div>
    ))
  }
*/

function App() {
  const [array, setArray] = useState([]);

  const [ticker, setTicker] = useState('AAPL');
  const [stockData, setStockData] = useState(null);

  const fetchAPI = async() => {
    const response = await axios.get("http://127.0.0.1:5000/api/test");
    setArray(response.data.users);
  };

  const fetchStockInfo = async(symbol) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/info/${symbol}`);
      const data = await res.json();
      setStockData(data)
    } catch (error) {
      console.error('Error fetching stock info: ', error)
      setStockData(null)
    }
  };

  useEffect(() => {
    fetchStockInfo(ticker);
  }, [ticker]);

  useEffect(() => {
    fetchAPI()
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold mb-6">Stock Info Viewer</h1>

        <input
          className="border px-3 py-2 rounded mb-4"
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g., AAPL)"
        />

        {stockData ? (
          <div className="bg-white p-4 rounded shadow max-w-md">
            <h2 className="text-xl font-semibold mb-2">
              {stockData['01. symbol']}
            </h2>
            <p><strong>Price:</strong> ${stockData['05. price']}</p>
            <p><strong>Open:</strong> ${stockData['02. open']}</p>
            <p><strong>High:</strong> ${stockData['03. high']}</p>
            <p><strong>Low:</strong> ${stockData['04. low']}</p>
            <p><strong>Volume:</strong> {stockData['06. volume']}</p>
            <p><strong>Change:</strong> {stockData['09. change']}</p>
            <p><strong>Change %:</strong> {stockData['10. change percent']}</p>
          </div>
        ) : (
          <p className="text-red-500">No data found or error fetching stock info.</p>
        )}
      </div>
    </>
  )
}

export default App
