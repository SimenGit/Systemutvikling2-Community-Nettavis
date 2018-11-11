import React from 'react';
import { Component } from 'react-simplified';
import {serverLink} from "../store";

class ViewComments extends Component {

    idInput = 0;
    state = {
        article: null,
        comment: ''
    };

    render() {
        return(

            <div className="viewComments">
                <input onChange={event => (this.idInput = event.target.value)} />
                <button className="comment-btn" onClick={this.onClick}>
                    {' '}
                    Se kommentarer
                </button>
                Kommentar: {this.state.comment}
            </div>
        );
    }

    onClick() {
        serverLink.getComments(this.idInput).then(data => {
            this.setState({comment: data[0].content})
        });
    }

}

export default ViewComments;