import React from 'react';
import {Component} from 'react-simplified';

class Article extends Component {

    render() {
        return (
            <div className = "card">
                <img className="card-img-top" src="/images/last ned.png"/>
                    <div className="card-body">
                    <h5 className="card-title">{this.props.article.header}</h5>
                    <p className="card-text"> {this.props.article.description}</p>
                        <a href="#" className="btn btn-primary">Les mer</a>
                </div>
            </div>
        )
    }

}

export default Article;