import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import './index.css';
import './assets/css/main.css';
import App from './App';
import Landing from './components/Landing';
import * as serviceWorker from './serviceWorker';
import MarkdownRenderer from './components/Articles/MarkdownRenderer';
import TopicMenu from './views/TopicMenu';
import Error404 from './views/404';

ReactDOM.render( 
        <BrowserRouter>
            <Switch>
                    <Route exact path="/">
                        <Redirect to="/home" />
                    </Route>
                    <Route exact path="/home" render={props => <App />}/>
                    <Route exact path="/head" render={props => <Landing />}/>
                    <Route exact path="/MdRender" render={props => <MarkdownRenderer props={{"md":"FUCKKKKKK"}} />}/>
                    <Route exact path="/article">
                        <TopicMenu />
                    </Route>
                    <Route exact path="/article/:type">
                        <TopicMenu/>
                    </Route>
                    <Route exact path="/article/:type/:id">
                        <MarkdownRenderer/>
                    </Route>
                    <Route exact path="/404">
                        <Error404 />
                    </Route>
                </Switch>
        </BrowserRouter>,
    document.getElementById('root')
);
/*
        <Auth0ProviderWithHistory>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/home" />
                </Route>
                <Route exact path="/home" render={props => <App />}/>
                <Route exact path="/head" render={props => <Landing />}/>
            </Switch>
        </Auth0ProviderWithHistory>
            <App />
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
