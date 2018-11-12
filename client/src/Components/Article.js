import React from 'react';
import {Component} from 'react-simplified';
import {history} from "../index";

class Article extends Component {

    render() {
        return (
            <div className = "article-list">
            <div className = "card">
                <img className="card-img-top" src = {"images/"+this.props.article.img}/>
                    <div className="card-body">
                    <h5 className="card-title">{this.props.article.header}</h5>
                    <p className="card-text"> {this.props.article.description}</p>
                        <a href="#" className="btn btn-primary" onClick = {this.onClick}>
                            Les mer</a>
                    </div>
            </div>
            </div>
        )
    }

    onClick() {
        history.push("/articleDetails/" + this.props.article.id);
        console.log(this.props.article.id);
    }
}

export default Article;