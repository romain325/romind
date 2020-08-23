import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import './index.css';
import App from './App';
import Landing from './components/Landing';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>
            <Route exact path="/home" render={props => <App />}/>
            <Route exact path="/head" render={props => <Landing />}/>
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
