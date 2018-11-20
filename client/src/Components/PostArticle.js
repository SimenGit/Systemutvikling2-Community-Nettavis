// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { commentStore, ratingStore, articleStore, userStore } from '../store';
import { history } from '../index';
//$FlowFixMe!
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class PostArticle extends Component {

  header = null;
  description = null;
  content = null;
  category_fk = null;
  file = null;
  importance = null;
  user_email = null;
  user_fk = null;
  date = new Date();
  article_id = null;

  onClickReturn() {
    history.push('/');
  }

  onClick() {
      console.log(this.user_fk);

    if (
      this.header !== null &&
      this.content !== null &&
      this.category_fk !== null &&
      this.importance !== null &&
      this.user_email !== null &&
      this.user_fk !== null
    ) {
      let yyyy = this.date.getFullYear();
      let mm = this.date.getMonth() + 1;
      let dd = this.date.getDate();
      let hour = this.date.getHours();
      let minutes = this.date.getMinutes();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      let date_made = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + minutes + ':00';

      const formData = new FormData();
      formData.append('file', this.file);
      formData.append('header', this.header);
      formData.append('description', this.description);
      formData.append('content', this.content);
      formData.append('date_made', date_made);
      formData.append('importance', this.importance);
      formData.append('category_fk', this.category_fk);
      formData.append('user_fk', this.user_fk);

      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      };
      articleStore.postArticle(formData, config);
      console.log('Inserted.');

      alert('Article posted.');
      history.push('/');
    } else {
      alert('Fill in all fields.');
    }
  }

  componentDidMount() {
    this.user_email = localStorage.getItem('userEmail');
    const {currentUser} = userStore;
    this.user_fk = currentUser.id;

    userStore.getUserByEmail2(this.user_email).then(data => {
      this.user_fk = data[0].id;
    });
  }

  render() {
    return (
      <div className="createArticleForm">
        <div className="createArticleTop">
          <h1>Post an article</h1>
          <Button className="createArticleReturnBTN" onClick={this.onClickReturn}>
            Return to HomePage
          </Button>
        </div>
        <Form className="articleCreateForm">
          <FormGroup>
            <Label for="header">Header</Label>
            <Input
              onChange={event => (this.header = event.target.value)}
              name="header"
              id="header"
              placeholder="Header"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              onChange={event => (this.description = event.target.value)}
              name="description"
              id="description"
              placeholder="Description"
            />
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Choose a category</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  id="opt2"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.category_fk = 'food';
                    }
                  }}
                />{' '}
                Food
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  id="opt2"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.category_fk = 'motor';
                    }
                  }}
                />{' '}
                Motor
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  id="opt2"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.category_fk = 'nature';
                    }
                  }}
                />{' '}
                Nature
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  id="opt2"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.category_fk = 'news';
                    }
                  }}
                />{' '}
                News
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio1"
                  id="opt2"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.category_fk = 'sport';
                    }
                  }}
                />{' '}
                Sport
              </Label>
            </FormGroup>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Write the article here</Label>
            <Input
              className="textarea"
              type="textarea"
              name="text"
              id="exampleText"
              onChange={event => (this.content = event.target.value)}
            />
          </FormGroup>
          <FormGroup className="uploadPhoto">
            <Label for="exampleFile">Upload a photo with your article</Label>
            <Input type="file" name="file" id="exampleFile" onChange={event => (this.file = event.target.files[0])} />
          </FormGroup>

          <FormGroup tag="fieldset">
            <legend>Importance</legend>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio3"
                  id="opt1"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.importance = 1;
                    }
                  }}
                />{' '}
                Important
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="radio"
                  name="radio3"
                  id="opt1"
                  onChange={event => {
                    if (event.target.value !== undefined) {
                      this.importance = 0;
                    }
                  }}
                />{' '}
                Trivial
              </Label>
            </FormGroup>
          </FormGroup>
          <div className="submitBTNPAD">
            <Button className="submitArticleBTN" onClick={this.onClick}>
              Submit
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default PostArticle;
