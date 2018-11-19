import {Component} from "react-simplified";
import React from "react";
import {serverLink} from "../store";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import {history} from "../index";
import Comments from "./Comments";


class ArticleDetails extends Component<{ match: {params: { id : number } } }> {

    email = localStorage.getItem("userEmail");

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

    likes = null;
    dislikes = null;

    state = {
        comments: {}
    };

    getComments() {

        serverLink.getCommentsByArticleID(this.id).then(data3 => {
            this.setState({ comments: data3 });
        });
    }

    getRating() {

        serverLink.getLikes(this.article_fk).then(data4 => {
            this.likes = data4[0].likes;
        });
        serverLink.getDislikes(this.article_fk).then(data5 => {
            this.dislikes = data5[0].dislikes;
        });

    }


    componentDidMount() {

        this.article_fk = this.props.match.params.id;

        this.getRating();
        this.getComments();

        setInterval(this.getComments, 2000);
        setInterval(this.getRating, 5000);

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
        });

    }

    onClickReturn() {
        history.push("/");
    }

    onClickLike() {

        let id = null;
        if(this.email !== null) {
            serverLink.getUserByEmail(this.email).then(data => {
                id = data[0].id;

                const formData = new FormData();
                formData.append('user_fk', id);
                formData.append('article_fk', this.article_fk);

                serverLink.checkUserRating(formData).then(data2 => {
                    console.log(data2[0]);
                    if (data2[0].id === null || data[0].id === undefined) {
                        serverLink.postRating({
                            rating: 1,
                            user_fk: id,
                            article_fk: this.article_fk
                        });
                    }else{
                        alert("you already rated this article.");
                    }
                })
            });

        } else {
            alert("You have to log in to rate an article");
        }

    }

    onClickDislike() {

        let id = null;
        if(this.email !== null) {
            serverLink.getUserByEmail(this.email).then(data => {
                id = data[0].id;

                const formData = new FormData();
                formData.append('user_fk', id);
                formData.append('article_fk', this.article_fk);

                serverLink.checkUserRating(formData).then(data2 => {
                    console.log(data2[0]);
                    if (data2[0].id === null || data[0].id === undefined) {
                        serverLink.postRating({
                            rating: 0,
                            user_fk: id,
                            article_fk: this.article_fk
                        });
                    }else{
                        alert("you already rated this article.");
                    }
                })
            });

        } else {
            alert("You have to log in to rate an article");
        }

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
            alert("Comment posted successfully.");
        }else{
            alert("You have to log in to post comments");
        }

    }



    render() {
        return (
            <div className="articleDetailsWrapper">

                <div className = "articleDetailsReturnField">
                    <Button className = "createArticleReturnBTN" onClick = {this.onClickReturn}>Return to HomePage</Button>
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

                    <div className = "rating-felt">
                        <FormGroup>
                            <div className="likesField">
                                <img className="likesImg" src="logos/like.png"/>
                                <Button className="likesBTN" onClick = {this.onClickLike}> {this.likes}</Button>

                                <img className="dislikesImg" src="logos/dislike.png"/>
                                <Button className="dislikesBTN" onClick = {this.onClickDislike}> {this.dislikes}</Button>
                            </div>
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