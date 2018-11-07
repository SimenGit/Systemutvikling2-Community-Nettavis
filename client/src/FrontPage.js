// @flow

import {Component} from "react-simplified";
import Article from "./Article";
import React from "react";
import {serverLink} from "./store";



class FrontPage extends Component {
    idInput = 0;

    state = {
        articles: {},
        username: ''
    };
    render() {
        return (
            <div className="search">
                {this.state.articles.length > 0 &&
                this.state.articles.map(article => {
                    return <Article article={article} />;
                })}
            </div>
        );
    }

    componentDidMount() {
        console.log('test');
        /*
        axios.get('/article').then(data => {
            console.log(data);
            //lagrer alle artikler i staten
            this.setState({ articles: data });
        });
*/
        serverLink.getArticles().then(data => {
            this.setState({ articles: data });
        });
    }
}

export default FrontPage;