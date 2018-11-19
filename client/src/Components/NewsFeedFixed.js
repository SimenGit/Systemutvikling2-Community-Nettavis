// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { serverLink } from '../store';
import NewsFeed from './NewsFeed';
import { Container, Row } from 'reactstrap';

class NewsFeedFixed extends Component {
  state = {
    newsfeed: {}
  };

  getNews() {
    serverLink.getArticlesNewsFeed().then(data => {
      this.setState({ newsfeed: data });
    });
  }

  componentDidMount() {
    setInterval(this.getNews, 30000);
    this.getNews();
  }

  render() {
    return (
      <div className="frontPageNewsFeedVertical">
        <Container className="containerNews">
          <Row>
            {this.state.newsfeed.length > 0 &&
              this.state.newsfeed.map(newsfeed => {
                return <NewsFeed newsfeed={newsfeed} />;
              })}
          </Row>
        </Container>
      </div>
    );
  }
}

export default NewsFeedFixed;
