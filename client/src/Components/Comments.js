// @flow

import React from 'react';
import { Component } from 'react-simplified';
// $FlowFixMe
import { Alert } from 'reactstrap';
import { userStore } from '../store';

class Comments extends Component< {comments: {user_fk_comment: number, comment: string} }> {
  commentUser = '';

  componentDidMount() {
    userStore.getUserByID(this.props.comments.user_fk_comment).then(data => {
      this.commentUser = data[0].name;
    });
  }

  render() {
    return (
      <div className="comment-list">
        <Alert color="secondary">
          <p>{'' + this.props.comments.comment}</p>
          <hr />
          <p className="mb-0">{'- ' + this.commentUser}</p>
        </Alert>
      </div>
    );
  }
}
export default Comments;