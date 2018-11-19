// @flow

import { Component } from 'react-simplified';
import Article from './Article';
import React from 'react';
import { serverLink } from '../store';

class FrontPage extends Component {
  state = {
    articles: {},
    username: '',
    newsfeed: {}
  };

  getNews() {
    serverLink.getArticlesNewsFeed().then(data => {
      this.setState({ newsfeed: data });
    });
  }

  render() {
    return (
      <div className="frontPage">
        <div className="newsfeedtext">
          <h1 className="detailsHeader">Important articles</h1>
        </div>

        <div className="frontPageArticles">
          {this.state.articles.length > 0 &&
            this.state.articles.map(article => {
              return <Article article={article} />;
            })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    serverLink.getArticlesImportant().then(data => {
      this.setState({ articles: data });
    });
  }
}

export default FrontPage;
