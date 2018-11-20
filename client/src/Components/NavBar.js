// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { commentStore, ratingStore, articleStore, userStore } from '../store';
import { history } from '../index';
// $FlowFixMe
import { Button, Input } from 'reactstrap';

class NavBar extends Component {
  username: string = '';
  passwordInput: string = '';
  output: string = '';

  onClickLogOut() {
    this.output = ' ';
    userStore.logout();
    localStorage.removeItem("userEmail");
    alert('You are now logged out');
  }

  onClick() {
    userStore.getUserByEmail(this.username).then(() => {
      const { currentUser } = userStore;
      if (currentUser.password === this.passwordInput) {
        localStorage.setItem("userEmail", currentUser.email);
        this.output = currentUser.email;
        alert('logged in successfully');
      } else {
        alert('username or password missmatch.');
      }
    });
  }

  onClickRegister() {
    history.push('/registerUser/');
  }

  render() {
    return (
      <div className="nav-wrapper">
        <nav className="navbar fixed-top">
          <div className="container">
            <div className="row">
              <div className="col-sm">
                <Input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  onChange={event => (this.username = event.target.value)}
                />
              </div>
              <div className="col-sm">
                <Input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={event => (this.passwordInput = event.target.value)}
                />
              </div>

              <div className="col-sm-login">
                <Button className="form-control-login" onClick={this.onClick}>
                  {' '}
                  Log in
                </Button>
              </div>
              <div className="col-sm-logout">
                <Button className="form-control-logout" onClick={this.onClickLogOut}>
                  Log out
                </Button>
              </div>

              <div className="col-sm-4">
                <a className="form-control">Logged in as: {this.output}</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavBar;
