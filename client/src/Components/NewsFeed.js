// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { ListGroup } from 'reactstrap';
import { ListGroupItem } from 'reactstrap';
import { formDate } from '../widgets';

class NewsFeed extends Component {
  render() {
    return (
      <div className="newsFeed">
        <ListGroup>
          <ListGroupItem>
            {this.props.newsfeed.header + '   :   ' + formDate(this.props.newsfeed.date_made)}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default NewsFeed;
