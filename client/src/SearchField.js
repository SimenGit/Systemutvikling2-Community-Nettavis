import React from 'react';
import {Component} from 'react-simplified';
import {serverLink} from "./store";


class SearchField extends Component {

    idInput = 0;
    state = {
        username: ''
    };

    render() {
        return (
            <div className="search">
                <input onChange={event => (this.idInput = event.target.value)} />
                <button className="card-body" onClick={this.onClick}>
                    {' '}
                    Se navnet på brukeren
                </button>
                Navnet på user er {this.state.username}
            </div>
        );
    }

    onClick() {
        serverLink.getUser(this.idInput).then(data => {
            this.setState({username: data[0].name})
        });
    }
}

export default SearchField;