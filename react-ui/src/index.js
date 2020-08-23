import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import './index.css';
import './assets/css/main.css';
import App from './App';
import Landing from './components/Landing';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./auth0ProviderWithHistory";

ReactDOM.render( 
    <BrowserRouter>
        <Auth0ProviderWithHistory>
            <App />
        </Auth0ProviderWithHistory>
    </BrowserRouter>,
    document.getElementById('root')
);
/*
<Switch>
    <Route exact path="/">
        <Redirect to="/home" />
    </Route>
    <Route exact path="/home" render={props => <Auth0ProviderWithHistory><App /></Auth0ProviderWithHistory>}/>
    <Route exact path="/head" render={props => <Landing />}/>
</Switch>
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
