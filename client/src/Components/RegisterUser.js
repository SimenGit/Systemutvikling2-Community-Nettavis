import React from 'react';
import {Component} from 'react-simplified';
import {serverLink} from "../store";
import {history} from "../index";
import { Alert } from 'reactstrap';

class RegisterUser extends Component {

    state: {
        name: null,
        age: null,
        email: null,
        password: null,
        //alert: false
    };

    onClick() {

        if(this.state.email !== undefined && this.state.password !== undefined && this.state.name !== undefined) {
            serverLink.getUser(this.state.email).then(data => {
                console.log(data[0].email);
                if(data[0].email === undefined) {
                    serverLink.registerUser({
                        email: this.state.email,
                        password: this.state.password,
                        name: this.state.name,
                        age: this.state.age
                    });
                    console.log("Brukeren var ikke registrert fra før.");
                }else{
                    console.log("Brukeren er allerede registrert.");
                }
            });
            this.alert = false;
        }else{
            console.log("Full ut alle feltene med *");
            //alert("Full ut alle feltene med *");
            this.alert = true;
        }
        console.log("Kom hit");

    }


    onClickHome() {
        history.push("/");
    }


    render() {


        let warning;
        /*
        if(this.alert) {
            warning = <Alert color="warning">
                This is a warning alert — check it out!
            </Alert>
        }else{
           warning = <Alert color="primary">
                This is a warning alert — check it out!
            </Alert>;
        } */

        return (

            <div className="registerUserPage">

                <div className="registerUserDetails" style={{padding: 100}}>
                    <input type="email" className="regEmail" aria-describedby="emailHelp"
                           placeholder="Enter email" onChange={event => (this.setState({email: event.target.value}))}/>
                    <input className="regPassword" placeholder="password"
                           onChange={event => (this.setState({password: event.target.value}))}/>
                    <input className="regName" placeholder="name"
                           onChange={event => (this.setState({name: event.target.value}))}/>
                    <input className="regAge" placeholder="age"
                           onChange={event => (this.setState({age: event.target.value}))}/>
                    <button className="registerUserBTN" onClick={this.onClick}>
                        Register
                    </button>

                </div>

                <div className="registerUserPageDetails">
                    <button className="regHomeBTN" onClick={this.onClickHome}>
                        Return To HomePage
                    </button>

                </div>

            </div>
        );
    }

}

export default RegisterUser;