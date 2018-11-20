// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { commentStore, ratingStore, articleStore, userStore } from '../store';
import NewsFeed from './NewsFeed';
//$FlowFixMe!
import { Container, Row } from 'reactstrap';

class NewsFeedFixed extends Component {
  getNews() {
    articleStore.getArticlesNewsFeed();
  }

  componentDidMount() {
    setInterval(this.getNews, 30000);
    this.getNews();
  }

  render() {
    const { newsfeed } = articleStore;
    return (
      <div className="frontPageNewsFeedVertical">
        <Container className="containerNews">
          <Row>
            {newsfeed.length > 0 &&
              newsfeed.map(newsfeed => {
                return <NewsFeed key={newsfeed.id} newsfeed={newsfeed} />;
              })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewsFeedFixed;
