import React from 'react';
import {Component} from 'react-simplified';
import {serverLink} from "../store";
import {history} from "../index";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';


class PostArticle extends Component {

    state: {
        categories: {}
    };


    onClickReturn() {
        history.push("/");
    }

    onClick() {

    }

    componentDidMount() {
        serverLink.getCategories().then(data => {
            this.setState({categories: data});
        })

    }


    render() {
        return (
            <div className="createArticleForm">
                <div className="createArticleTop">
                    <h1>Post an article</h1>
                    <button className="createArticleReturnBTN" onClick={this.onClickReturn}>Return to HomePage</button>
                </div>
                <Form className="articleCreateForm">
                    <FormGroup>
                        <Label for="header">Header</Label>
                        <Input name="header" id="header" placeholder="Header"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input name="header" id="description" placeholder="Description"/>
                    </FormGroup>

                    <FormGroup>
                        <Label for="selectCatagory">Select catagory</Label>
                        <Input type="select" name="select" id="selectCatagory">
                            <option>food</option>
                            <option>motor</option>
                            <option>nature</option>
                            <option>news</option>
                            <option>sport</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleText">Write the article here</Label>
                        <Input className="textarea" type="textarea" name="text" id="exampleText"/>
                    </FormGroup>
                    <FormGroup className="uploadPhoto">
                        <Label for="exampleFile">Upload a photo with your article?</Label>
                        <Input type="file" name="file" id="exampleFile"/>

                    </FormGroup>
                    <FormGroup tag="fieldset">
                        <legend>Importance</legend>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1"/>{' '}
                                Important
                            </Label>
                        </FormGroup>
                        <FormGroup check>
                            <Label check>
                                <Input type="radio" name="radio1"/>{' '}
                                Trivial
                            </Label>
                        </FormGroup>
                    </FormGroup>
                    <div className="submitBTNPAD">
                        <Button className="submitArticleBTN" onClick={this.onClick}>Submit</Button>
                    </div>
                </Form>
            </div>

        );

    }

}

export default PostArticle;