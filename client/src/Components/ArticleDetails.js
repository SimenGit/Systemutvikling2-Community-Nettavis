import {Component} from "react-simplified";
import React from "react";


class ArticleDetails extends Component<{ match: {params: { id : number } } }> {

    render() {
        return (
            <div style = {{padding: 100}}>
                Dette er artikkel
                {this.props.match.params.id}
                </div>
        );
    }

//this.props.match.params.id

}

export default ArticleDetails;