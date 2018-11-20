// @flow

import { Component } from 'react-simplified';
import React from 'react';
import { commentStore, ratingStore, articleStore, userStore } from '../store';
// $FlowFixMe
import { Button, Form, FormGroup, Input } from 'reactstrap';
import { history } from '../index';
import Comments from './Comments';
import { formDate } from '../widgets';

class ArticleDetails extends Component<{ match: { params: { id: number } } }> {
  email: string = '';
  id: number = 0;
  userPosted: string = '';
  thisComment: string = '';
  comment: string = '';
  article_fk: number = 0;
  user_fk_comment: string = '';
  likes: number = 0;
  dislikes: number = 0;
  comments = {};

  getComments() {
    commentStore.getCommentsByArticleID(this.id).then(data => {
      this.comments = data;
    });
  }

  getRating() {
    ratingStore.getLikes(this.article_fk).then(data4 => {
      this.likes = data4[0].likes;
    });
    ratingStore.getDislikes(this.article_fk).then(data5 => {
      this.dislikes = data5[0].dislikes;
    });
  }

  componentDidMount() {
    this.id = this.props.match.params.id;
    this.email = localStorage.getItem('userEmail') || '';
    this.article_fk = this.props.match.params.id;
    this.getRating();
    this.getComments();
    setInterval(this.getComments, 5000);
    setInterval(this.getRating, 5000);

    articleStore.getArticleById(this.props.match.params.id).then(user_fk => {
      userStore.getUserByID(user_fk).then(data => {
        this.userPosted = data[0].name;
      });
    });
  }

  onClickReturn() {
    history.push('/');
  }

  onClickRating(like: boolean) {
    let user_fk = null;
    if (this.email !== null) {
      userStore.getUserByEmail(this.email).then(data => {
        user_fk = data[0].id;
        ratingStore.postRating({
          rating: like,
          user_fk: user_fk,
          article_fk: this.article_fk
        });
      });
    } else {
      alert('You have to log in to rate an article');
    }
  }

  submitComment() {
    let email: string = localStorage.getItem('userEmail') || '';
    if (email !== '') {
      userStore.getUserByEmail(email).then(data => {
        commentStore.postComment({
          comment: this.comment,
          user_fk_comment: data[0].id,
          article_fk: this.article_fk
        });
      });
      alert('Comment posted successfully.');
    } else {
      alert('You have to log in to post comments');
    }
  }

  render() {
    const { currentArticle } = articleStore;
    return (
      <div className="articleDetailsWrapper">
        <div className="articleDetailsReturnField">
          <Button className="createArticleReturnBTN" onClick={this.onClickReturn}>
            Return to HomePage
          </Button>
        </div>

        <Form className="articleCreateForm">
          <div className="detailsTopPart">
            <FormGroup>
              <img className="imgDetails" src={'/images/' + currentArticle.img} />
            </FormGroup>
            <FormGroup>
              <strong className="postedBy">{'article posted by: ' + this.userPosted + '    '}</strong>
              <i>{formDate(currentArticle.date_made)}</i>
            </FormGroup>
            <FormGroup className="detailsDescription">
              <i>{'Bilde beskrivelse: ' + currentArticle.description}</i>
            </FormGroup>
          </div>
          <FormGroup>
            <h1 className="detailsHeader">{currentArticle.header}</h1>
          </FormGroup>

          <div className="articleContent">
            <FormGroup>
              <p>{currentArticle.content}</p>
            </FormGroup>
          </div>

          <div className="rating-felt">
            <FormGroup>
              <div className="likesField">
                <img className="likesImg" src="logos/like.png" />
                <Button onClick={() => this.onClickRating(true)} className="likesBTN">
                  {' '}
                  {'' + this.likes}
                </Button>
                <img className="dislikesImg" src="logos/dislike.png" />
                <Button onClick={() => this.onClickRating(false)} className="dislikesBTN">
                  {' '}
                  {'' + this.dislikes}
                </Button>
              </div>
            </FormGroup>
          </div>

          <div className="kommentarfelt">
            <FormGroup>
              <h2 className="kommentarerText">Kommentarer:</h2>
            </FormGroup>
            <FormGroup className="commentList">
              {this.comments.length > 0 &&
                this.comments.map(comments => {
                  return <Comments comments={comments} />;
                })}
            </FormGroup>

            <FormGroup className="dineComments">
              <p>Leave a comment!</p>
              <Input
                className="textarea"
                type="textarea"
                name="text"
                id="exampleText"
                onChange={event => (this.comment = event.target.value)}
              />
              <Button className="form-control" onClick={this.submitComment}>
                Submit
              </Button>
            </FormGroup>
          </div>
        </Form>
      </div>
    );
  }
}

export default ArticleDetails;
