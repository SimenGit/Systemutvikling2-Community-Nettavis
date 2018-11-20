// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { Button } from 'reactstrap';

class Category extends Component {
  onClick() {
    history.push('/articleDetails/' + this.props.categories.id);
    console.log(this.props.categories.id);
  }

  render() {
    return (
      <div className="article-list">
        <div className="card">
          <img className="card-img-top" src={'images/' + this.props.categories.img} />
          <div className="card-body">
            <i className="card-Date">{this.props.categories.date_made}</i>
            <h5 className="card-title">{this.props.categories.header}</h5>
            <Button className="articleCardBTN" onClick={this.onClick}>
              Read more
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Category;
