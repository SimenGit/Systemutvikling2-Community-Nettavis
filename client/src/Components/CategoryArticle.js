// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Category from './Category';
import { articleStore } from '../store';
import { Button } from 'reactstrap';

class CategoryArticle extends Component {
  category = null;

  state = {
    categories: {}
  };

  onClickReturn() {
    localStorage.removeItem('category');
    history.push('/');
  }

  render() {
    return (
      <div className="articlesByCategory">
        <div className="articlesByCategoryTop">
          <Button className="createArticleReturnBTN" onClick={this.onClickReturn}>
            Return to HomePage
          </Button>
          <div className="textTopCat">
            <h4>Articles with category</h4>
            <h1 className="categoryText">{this.category}</h1>
          </div>
        </div>

        <div className="catArticles">
          {this.state.categories.length > 0 &&
            this.state.categories.map(categories => {
              return <Category categories={categories} />;
            })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.category = localStorage.getItem('category');
    articleStore.getArticleByCategory(this.category).then(data => {
      this.setState({ categories: data });
    });
  }
}

export default CategoryArticle;