import Article from './Article';
import ReactDOM from 'react-dom';
import React from 'react';
import { Component } from 'react-simplified';
import FrontPage from './FrontPage';
import SearchField from './SearchField';


const root = document.getElementById('root');
if (root) ReactDOM.render(<div> <FrontPage/> <SearchField/> </div>, root);
