// @flow

import {Component} from "react-simplified";
import Article from "./Article";
import NewsFeed from "./NewsFeed";
import React from "react";
import {serverLink} from "../store";
import { Button } from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';

class FrontPage extends Component {

    state = {
        articles: {},
        username: '',
        newsfeed: {}
    };


    getNews() {
        serverLink.getArticlesNewsFeed().then(data => {
            this.setState({ newsfeed: data });
        });
    }

    render() {
        return (
            <div className="frontPage">

                <div className = "newsfeedtext">
                    <b>Newsfeed</b>
                </div>

                <div className="frontPageNewsFeed">
                    {this.state.newsfeed.length > 0 &&
                    this.state.newsfeed.map(newsfeed => {
                        return <NewsFeed newsfeed={newsfeed}/>;
                    })}
                </div>

                <div className="frontPageArticles">
                    {this.state.articles.length > 0 &&
                    this.state.articles.map(article => {
                        return <Article article={article}/>;
                    })}
                </div>
            </div>
        );
    }

    componentDidMount() {

        setInterval(this.getNews, 30000);
        this.getNews();
        serverLink.getArticlesImportant().then(data => {
            this.setState({ articles: data });
        });
    }

}

export default FrontPage;