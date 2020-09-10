import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from "./components/NavBar"




function App() {

  const [message, setMessage] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState('/api');
  
  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        setMessage(json.message);
        setIsFetching(false);
      }).catch(e => {
        setMessage(`API call failed: ${e}`);
        setIsFetching(false);
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);


  return (
    <div className="App" >
      <NavBar />
      <div>

        <img src={logo} className="App-logo" alt="logo" />

        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
      </div>
    </div>
  );

}

export default App;
