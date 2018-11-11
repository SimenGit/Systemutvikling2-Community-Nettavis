import React from 'react';
import { Component } from 'react-simplified';
import {serverLink} from "../store";

class ViewComments extends Component {

    state = {
        password: '',
        comment: ''
    };

    render() {
        return(
            <div className="viewComments">
                    <input type="password" className="form-control" placeholder="Password"
                           onChange={event => (this.state.password = event.target.value)}/>

                    <button className="submit" onClick={this.onClick}>
                        {' '}
                        submit
                    </button>
                    <h1>output: {this.state.comment}</h1>
            </div>
        );
    }

    onClick() {
        this.setState({comment: this.state.password})
    }


}

export default ViewComments;