import React from 'react';
import { Component } from 'react-simplified';
import {history} from "../index";
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

class RightNav extends Component {


    onClickPost()  {
        var userEmail = localStorage.getItem("userEmail");
        console.log(userEmail);
        if(userEmail !== null) {
            history.push('/postArticle');
        }else{
            alert("You have to be logged in to post articles.");
        }
    }

    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <div className = "side-Buttons">
                    <div className = "btn1">
                <Button className = "button1">Categories</Button>
                    </div>
                    <div className = "btn2">
                <Button className = "button2" >Best rated</Button>
                    </div>
                    <div className = "btn3">
                <Button className = "button3" onClick={this.onClickPost}>Post article</Button>
                    </div>
                    <div className = "btn4">
                <Button className = "button4" >Delete article</Button>
                    </div>
                    <div className = "btn5">
                    <Button className = "button5" >User profile</Button>
                    </div>
                    <div className = "btn6">
                        <Button className = "button6" >Search for articles</Button>
                    <Input className = "form-control" type="text" placeholder="type here..."/>

                    </div>
                </div>
            </div>
        );
    }
}

export default RightNav;