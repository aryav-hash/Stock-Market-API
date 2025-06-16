import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [array, setArray] = useState([]);

  const fetchAPI = async() => {
    const response = await axios.get("http://127.0.0.1:5000/api/test");
    setArray(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      {
        array.map((user, index) => (
          <div key={index}>
            <span> {user} </span><br/>
          </div>
        ))
      }
    </>
  )
}

export default App
