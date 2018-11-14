import React from 'react';
import { Component } from 'react-simplified';
import {serverLink} from "../store";
import {history} from "../index";
import {user} from "../store";
import {FormText, Button, Input} from 'reactstrap';


class NavBar extends Component {

    state = {
        username: '',
        password: '',
        passwordInput: '',
        output: '',
        loggedInn: true
    };

    onClickLogOut() {
        localStorage.removeItem("userEmail");
        this.setState({output: ' '});
    }

    onClick() {

        serverLink.getUserByEmail(this.state.username).then(data => {

            this.setState({password: data[0].password});

            if(this.state.password === this.state.passwordInput) {
                this.setState({output: this.state.username});
                localStorage.setItem("userEmail", this.state.username);
                console.log("logget inn!");
            }else{
                console.log("brukernavn eller passord missmatch.");
                alert("username or password missmatch.");
            }
        });
    }

    onClickRegister() {
        history.push("/registerUser/");
    }

  render() {
    return (
      <div className="nav-wrapper">
          <nav className="navbar fixed-top navbar-light bg-light">
              <div className="container">
                  <div className="row">
                        <div className="col-sm">
                            <Input type="email" className="form-control" aria-describedby="emailHelp"
                                   placeholder="Enter email" onChange={event => (this.state.username = event.target.value)}/>
                        </div>
                        <div className="col-sm">
                            <Input type="password" className="form-control" placeholder="Password"
                                   onChange={event => (this.state.passwordInput = event.target.value)}/>
                        </div>
                         <div className="col-sm">
                             <Button className = "form-control" onClick={this.onClick}>
                                 {' '}
                                 Log in
                             </Button>
                        </div>
                      <div className="col-sm">
                          <Button className = "form-control" onClick={this.onClickLogOut}>
                              Log out
                          </Button>
                      </div>

                      <div className="col-sm-4">
                        <a className = "form-control">Logged in as: {this.state.output}</a>
                      </div>

                  </div>
              </div>
          </nav>
      </div>
    );
  }
}

export default NavBar;
