import React from 'react';
import ReactDOM from 'react-dom';
import './_index.scss';
import Admin from './pages/Admin';
import Home from './pages/Home';
import ArticlePage from './pages/ArticlePage';
import Header from './components/Header';
import Footer from './components/Footer';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


const root = (
    <Router>
        <Header/>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/articles/:id" component={ArticlePage}/>
            <Route path="/admin" component={Admin}/>
        </Switch>
        <Footer/>
    </Router>
);

ReactDOM.render(root, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
