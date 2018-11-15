import React from 'react';
import {Component} from 'react-simplified';
import {history} from "../index";
import {Alert} from "reactstrap";
import {serverLink} from "../store";


class Comments extends Component {

    commentUser = null;

    componentDidMount() {
        serverLink.getUserByID(this.props.comments.user_fk_comment).then(data => {
            this.commentUser = data[0].name;
        });
    }

    render() {

        return (
            <div className = "comment-list">
                <Alert color="secondary">
                    <p>
                        {this.props.comments.comment}
                    </p>
                    <hr />
                    <p className="mb-0">
                        {"- " + this.commentUser}
                    </p>
                </Alert>
            </div>
        )
    }


}
export default Comments;