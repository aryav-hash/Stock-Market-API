import React, { useState, useEffect } from 'react'

function App() {

  const [stockDate, setStockData] = useState(null);
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStock = async() => {
      setLoading(true);
    }
  })

  return (
    <>
      <div>
        <h1 className="flex justify-center"> This is the finnhub project! </h1>
      </div>
    </>
  )
}

export default App
