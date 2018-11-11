import ReactDOM from 'react-dom';
import React from 'react';
import FrontPage from './Components/FrontPage';
import NavBar from './Components/NavBar';
import LogoTop from './Components/LogoTop'
import ViewComments from "./Components/viewComments";
import RightNav from "./Components/RightNav"

const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <div>
            {' '}
            <FrontPage /> <NavBar/> <LogoTop/> <RightNav/>{' '}
        </div>,
        root
    );