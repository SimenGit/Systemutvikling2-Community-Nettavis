import React from 'react';
import { Component } from 'react-simplified';
import {history} from "../index";
import Category from "./Category";
import {serverLink} from "../store";


class CategoryArticle extends Component {

    category = null;

    state = {
        categories: {}
    };


    onClickReturn() {
        localStorage.removeItem("category");
        history.push("/");
    }

    render() {
        return(
                <div className = "articlesByCategory">
                <div className = "articlesByCategoryTop">
                <button className="createArticleReturnBTN" onClick={this.onClickReturn}>Return to HomePage</button>
                <h1>{this.category}</h1>
                </div>

                <div className="catArticles">
                    {this.state.categories.length > 0 &&
                    this.state.categories.map(categories => {
                        return <Category categories ={categories}/>;
                    })}
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.category = localStorage.getItem("category");
        serverLink.getArticleByCategory(this.category).then(data => {
            this.setState({ categories: data });
        });
    }

}


export default CategoryArticle;