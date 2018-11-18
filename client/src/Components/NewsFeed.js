import React from 'react';
import {Component} from 'react-simplified';
import {ListGroup} from "reactstrap";
import {ListGroupItem} from "reactstrap";
import {Container, Row, Col} from "reactstrap";

class NewsFeed extends Component {

    render() {
        return(
            <div className = "newsFeed">
                <ListGroup>
                    <ListGroupItem>{this.props.newsfeed.header + "   :   " + this.props.newsfeed.date_made}</ListGroupItem>
                </ListGroup>
            </div>

        )
    }





}

export default NewsFeed;