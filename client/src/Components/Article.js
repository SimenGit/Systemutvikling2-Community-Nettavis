import React from 'react';
import {Component} from 'react-simplified';

class Article extends Component {

    render() {
        console.log(this.props.article.img);
        return (
            <div className = "article-list">
            <div className = "card">
                <img className="card-img-top" src = "/images/food.jpg"/>
                    <div className="card-body">
                    <h5 className="card-title">{this.props.article.header}</h5>
                    <p className="card-text"> {this.props.article.description}</p>
                        <a href="#" className="btn btn-primary">Les mer</a>
                    </div>
            </div>
            </div>
        )
    }
}

export default Article;