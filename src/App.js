import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const API_URL = "https://rickandmortyapi.com/api/episode"
  const PER_PAGE = 20
  
  const [data, setData] = useState([])
  const [info, setInfo] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  
  const fetchData = (page) => {
    setLoading(true)
    fetch(`${API_URL}?page=${page}`).then(response => {
      response.json().then(data => {
        setData(data.results)
        setInfo(data.info)
        setLoading(false)
      })
    })
  }
  
  useEffect(() => {
    fetchData(page)
  }, [page])

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Air Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.air_date}</td>
          </tr>
        ))}
      </tbody>
      <button 
        onClick={() => setPage(1)}
        disabled={loading || page == 1}
      >
        First
      </button>
      <button 
        onClick={() => setPage(prevPage => prevPage - 1)}
        disabled={loading || page == 1}
      >
        Previous
      </button>
      <button 
        onClick={() => setPage(prevPage => prevPage + 1)}
        disabled={loading || page == Math.ceil(info.count/PER_PAGE)}
      >
        Next
      </button>
      <button 
        onClick={() => setPage(Math.ceil(info.count/PER_PAGE))}
        disabled={loading || page == Math.ceil(info.count/PER_PAGE)}
      >
        Last
      </button>
    </table>
  );
}

export default App;
