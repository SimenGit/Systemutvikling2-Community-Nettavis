// @flow

import { Component } from 'react-simplified';
import Article from './Article';
import React from 'react';
import { articleStore } from '../store';

class FrontPage extends Component {

  render() {
    const {articles} = articleStore;
    return (
      <div className="frontPage">
        <div className="newsfeedtext">
          <h1 className="detailsHeader">Important articles</h1>
        </div>

        <div className="frontPageArticles">
          {articles.length > 0 &&
            articles.map(article => {
              return <Article key={article.id} article={article} />;
            })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    articleStore.getArticlesImportant();
  }
}

export default FrontPage;
