import * as React from 'react';
import {Component} from 'react-simplified';
import {Input, Label, Button} from 'reactstrap';
import {serverLink} from "../store";

class DeleteArticle extends Component {

    header = null;

    onClickSubmit() {

        serverLink.getArticleIDbyHeader(this.header).then(data => {
            serverLink.deleteComments(data[0].id);
            serverLink.deleteArticle(this.header);
        });


    }

    render() {
        return(
            <div className = "deleteArticlesWrapper">
                <Label for="exampleText">Write the header of which article to delete here</Label>
                <Input className="textarea" name="text"
                       onChange={event => (this.header = event.target.value)}/>
                <Button className = "deleteSubmitBTN" onClick = {this.onClickSubmit}>Submit</Button>
            </div>
        )
    }


}

export default DeleteArticle;