import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginButton from './components/Auth/LoginButton';
import LogoutButton from './components/Auth/LogoutButton';
import Profile from './views/Profile';
import { useAuth0 } from "@auth0/auth0-react";
import {Route, Link} from "react-router-dom";
import Landing  from "./components/Landing";



function App() {
  const { isAuthenticated, isLoading, error } = useAuth0();

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

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Oops... {error.message}</div>;
  }


  return (
    <div className="App" >
      <header className="App-header" >
        <Link to="head"><img src={logo} className="App-logo" alt="logo" /></Link>
        <Route path="/head" component={Landing} />
        { process.env.NODE_ENV === 'production' ?
            <p>
              This is a production build from create-react-app.
            </p>
          : <p>
              Edit <code>src/App.js</code> and save to reload.
              State: {process.env.NODE_ENV}
            </p>
        }
        <p>{'« '}<strong>
          {isFetching
            ? 'Fetching message from API'
            : message}
        </strong>{' »'}</p>
        <p><a
          className="App-link"
          href="https://github.com/mars/heroku-cra-node"
        >
          React + Node deployment on Heroku
        </a></p>
        <p><a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a></p>
        {isAuthenticated.toString()}
        {(!isAuthenticated) ? (<div><h4>Connecte Toi!</h4><LoginButton /></div>) : (<div><Profile /><LogoutButton /></div>)}        
      </header>
    </div>
  );

}

export default App;
