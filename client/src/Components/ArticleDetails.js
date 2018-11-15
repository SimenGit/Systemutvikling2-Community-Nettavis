import {Component} from "react-simplified";
import React from "react";
import {serverLink} from "../store";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {history} from "../index";
import Comments from "./Comments";


class ArticleDetails extends Component<{ match: {params: { id : number } } }> {

    id = null;
    header = null;
    description = null;
    content = null;
    date_made = null;
    img = null;
    importance = null;
    category_fk = null;
    user_fk = null;
    userPosted = null;

    thisComment = null;

    comment = null;
    user_fk_comment = null;
    article_fk = null;

    state = {
        comments: {}
    };

    componentDidMount() {

        this.article_fk = this.props.match.params.id;

        serverLink.getArticleById(this.props.match.params.id).then(data => {
            this.header = data[0].header;
            this.description = data[0].description;
            this.content = data[0].content;
            this.date_made= data[0].date_made;
            this.img = data[0].img;
            this.importance = data[0].importance;
            this.category_fk = data[0].category_fk;
            this.user_fk = data[0].user_fk;
            this.id = data[0].id;
            serverLink.getUserByID(this.user_fk).then(data2 => {
                this.userPosted = data2[0].name;
            });
            serverLink.getCommentsByArticleID(this.id).then(data3 => {
                this.setState({ comments: data3 });
            });

        });


    }

    onClickReturn() {
        history.push("/");
    }

    submitComment() {

        let email = localStorage.getItem("userEmail");
        if(email !== null){
            serverLink.getUserByEmail(email).then(data => {
                serverLink.postComment({
                    comment: this.comment,
                    user_fk_comment: data[0].id,
                    article_fk: this.article_fk
                });
            });
            alert("Comment posted successfully, refresh page.");
        }else{
            alert("You have to log in to post comments");
        }

    }



    render() {
        return (
            <div className="articleDetailsWrapper">

                <div className = "articleDetailsReturnField">
                    <Button className = "articleDetailsReturnBTN" onClick = {this.onClickReturn}>Return to HomePage</Button>
                </div>

                <Form className="articleCreateForm">
                    <div className="detailsTopPart">
                        <FormGroup>
                            <img className="imgDetails" src={"/images/" + this.img}/>

                        </FormGroup>
                        <FormGroup>
                            <strong className="postedBy">{"article posted by: " + this.userPosted + "    "}</strong>
                            <i>{this.date_made}</i>
                        </FormGroup>
                        <FormGroup className = "detailsDescription">
                            <i>{"Bilde beskrivelse: " + this.description}</i>
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <h1 className = "detailsHeader">{this.header}</h1>
                    </FormGroup>

                    <div className = "articleContent">
                    <FormGroup>
                        <p>{this.content}</p>

                    </FormGroup>
                    </div>
                    <div className = "kommentarfelt">
                        <FormGroup>
                            <h2 className = "kommentarerText">Kommentarer:</h2>
                        </FormGroup>
                        <FormGroup className = "commentList">
                        {this.state.comments.length > 0 &&
                        this.state.comments.map(comments => {
                            return <Comments comments={comments}/>;
                        })}
                        </FormGroup>


                        <FormGroup className = "dineComments">
                            <p>Leave a comment!</p>
                            <Input className="textarea" type="textarea" name="text" id="exampleText"
                                   onChange={event => (this.comment = event.target.value)}/>
                            <Button className = "form-control" onClick = {this.submitComment}>Submit</Button>
                        </FormGroup>


                    </div>
                </Form>
            </div>
        );
    }

//this.props.match.params.id

}

export default ArticleDetails;