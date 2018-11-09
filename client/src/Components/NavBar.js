import React from 'react';
import { Component } from 'react-simplified';
import {serverLink} from "../store";

class NavBar extends Component {

    state = {
        username: '',
        password: '',
        passwordInput: '',
        loggedIn: ''
    };

    onClick() {

        //cannot get password from undefined ?
        console.log(this.state.username);
        console.log(this.state.password);

        serverLink.getUserByEmail(this.state.username).then(data => {

            this.state.password = data[0].password;

            if(password === passwordInput) {
                this.state.loggedIn = this.state.username;
                console.log("logget inn!");
            }else{
                console.log("brukernavn eller passord missmatch.");
            }
        });
    }

  render() {
    return (
      <div className="nav-wrapper">
          <nav className=" navbar fixed-top navbar-light bg-light">
              <div className="container">
                  <div className="row">
                      <div className="col-sm">
                         <h3>NavBar</h3>
                      </div>
                        <div className="col-sm">
                            <input type="email" className="form-control" aria-describedby="emailHelp"
                                   placeholder="Enter email" onChange={event => (this.state.username = event.target.value)}/>
                        </div>
                        <div className="col-sm">
                            <input type="password" className="form-control" placeholder="Password"
                                   onChange={event => (this.state.passwordInput = event.target.value)}/>
                        </div>
                         <div className="col-sm">
                             <button className = "form-control" onClick={this.onClick}>
                                 {' '}
                                 Log in
                             </button>
                        </div>
                      <div className="col-sm-4">
                        <h7 className = "form-control">Logget inn som: {this.state.loggedIn}</h7>
                      </div>
                  </div>
              </div>
          </nav>
      </div>
    );
  }
}

export default NavBar;
