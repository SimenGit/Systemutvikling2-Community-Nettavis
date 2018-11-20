// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import Category from './Category';
import { articleStore } from '../store';
//$FlowFixMe
import { Button } from 'reactstrap';

class CategoryArticle extends Component {
  category = null;
  categories = {};

  onClickReturn() {
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
          {this.categories.length > 0 &&
            this.categories.map(categories => {
              return <Category categories={categories} />;
            })}
        </div>
      </div>
    );
  }

  componentDidMount() {
    // $FlowFixMe
    this.category = this.props.match.params.category;
    articleStore.getArticleByCategory(this.category).then(data => {
      this.categories = data;
    });
  }
}

export default CategoryArticle;
