import ReactDOM from 'react-dom';
import React from 'react';

import FrontPage from './Components/FrontPage';
import NavBar from './Components/NavBar';
import RightNav from "./Components/RightNav";
import ArticleDetails from "./Components/ArticleDetails";
import RegisterUser from './Components/RegisterUser';
import PostArticle from './Components/PostArticle';

import { HashRouter, Route } from 'react-router-dom';
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
            <Route exact path="/registerUser" component = {RegisterUser}/>
            <Route exact path="/postArticle" component = {PostArticle}/>
        </div>
        </HashRouter>,
        root
    );