import Article from './Article';
import ReactDOM from 'react-dom';
import React from 'react';
import { Component } from 'react-simplified';
import FrontPage from './FrontPage';
import SearchField from './SearchField';
import FrontPageTop from './FrontPageTop';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <div>
      {' '}
      <FrontPage /> <SearchField /> <FrontPageTop/>{' '}
    </div>,
    root
  );
