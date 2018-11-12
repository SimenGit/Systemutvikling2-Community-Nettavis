import ReactDOM from 'react-dom';
import React from 'react';
import FrontPage from './Components/FrontPage';
import NavBar from './Components/NavBar';
import LogoTop from './Components/LogoTop'
import ViewComments from "./Components/viewComments";
import RightNav from "./Components/RightNav"
import ArticleDetails from "./Components/ArticleDetails";
import {Route, HashRouter} from 'react-router-dom'
import createHashHistory from 'history/createHashHistory';
export const history = createHashHistory();


const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
        <div>
            <NavBar/>
            <RightNav/>
            <Route exact path="/" component={FrontPage} />
            <Route exact path="/articleDetails/:id" component={ArticleDetails} />
        </div>
        </HashRouter>,
        root
    );