// @flow

import {Component} from "react-simplified";
import Article from "./Article";
import React from "react";
import {serverLink} from "../store";
import { Button } from 'reactstrap';

class FrontPage extends Component {

    state = {
        articles: {},
        username: ''
    };
    render() {
        return (
            <div className="frontPageArticles">
                {this.state.articles.length > 0 &&
                this.state.articles.map(article => {
                    return <Article article={article} />;
                })}
            </div>
        );
    }

    componentDidMount() {

        serverLink.getArticles().then(data => {
            this.setState({ articles: data });
        });
    }
}

export default FrontPage;