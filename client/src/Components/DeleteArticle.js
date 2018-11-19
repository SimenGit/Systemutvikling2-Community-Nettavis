import * as React from 'react';
import {Component} from 'react-simplified';
import {Input, Label, Button} from 'reactstrap';
import {serverLink} from "../store";
import {history} from "../index";

class DeleteArticle extends Component {

    header = null;

    onClickSubmit() {
        serverLink.getArticleIDbyHeader(this.header).then(data => {
            serverLink.deleteComments(data[0].id);
            serverLink.deleteArticle(this.header);
        });
    }

    onClickReturn() {
        history.push("/");
    }


    render() {
        return(
            <div className = "deleteArticlesWrapper">
                <div className = "deleteTop">
                    <h1>Delete an article</h1>
                    <Button className="createArticleReturnBTN" onClick={this.onClickReturn}>Return to HomePage</Button>
                </div>

                <Label for="exampleText">Write the header of which article to delete here</Label>
                <Input className="textarea" name="text"
                       onChange={event => (this.header = event.target.value)}/>
                <div className = "deleteSubmitBTN">
                    <Button className="submitArticleBTN" onClick={this.onClickSubmit}>Submit</Button>
                </div>
            </div>
        )
    }


}

export default DeleteArticle;