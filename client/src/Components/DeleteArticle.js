// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Input, Label, Button } from 'reactstrap';
import { commentStore, ratingStore, articleStore } from '../store';
import { history } from '../index';

class DeleteArticle extends Component {
  header = null;

  onClickSubmit() {
    articleStore.getByHeader(this.header).then(data => {
      let check = data[0].id;
      if (check !== undefined || check !== null) {
        commentStore.deleteComments(data[0].id);
        ratingStore.deleteRating(data[0].id);
        alert('Deleted successfully');
      } else {
        alert('Could not find any article with that header');
      }
      articleStore.deleteArticle(this.header);
    });
  }

  onClickReturn() {
    history.push('/');
  }

  render() {
    return (
      <div className="deleteArticlesWrapper">
        <div className="deleteTop">
          <h1>Delete an article</h1>
          <Button className="createArticleReturnBTN" onClick={this.onClickReturn}>
            Return to HomePage
          </Button>
        </div>

        <Label for="exampleText">Write the header of which article to delete here</Label>
        <Input className="textarea" name="text" onChange={event => (this.header = event.target.value)} />
        <div className="deleteSubmitBTN">
          <Button className="submitArticleBTN" onClick={this.onClickSubmit}>
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default DeleteArticle;
