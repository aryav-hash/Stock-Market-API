import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

  const fetchAPI = async() => {
    const response = await axios.get("http://127.0.0.1:5000/api/test");
    console.log(response.data.users);
  };

  useEffect(() => {
    fetchAPI()
  }, [])

  return (
    <>
      
    </>
  )
}

export default App
