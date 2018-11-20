import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { Button } from 'reactstrap';
import {formDate} from "../widgets";

class Article extends Component {
  render() {
    return (
      <div className="article-list">
        <div className="card">
          <img className="card-img-top" src={'images/' + this.props.article.img} />
          <div className="card-body">
            <i className="card-Date">{formDate(this.props.article.date_made)}</i>
            <h5 className="card-title">{this.props.article.header}</h5>
            <Button className="articleCardBTN" onClick={this.onClick}>
              Read more
            </Button>
          </div>
        </div>
      </div>
    );
  }

  onClick() {
    history.push('/articleDetails/' + this.props.article.id);
  }
}

export default Article;
