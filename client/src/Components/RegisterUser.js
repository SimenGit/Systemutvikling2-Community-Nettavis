// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { userStore } from '../store';
import { history } from '../index';
import { Input, Button } from 'reactstrap';

class RegisterUser extends Component {
  name: string = '';
  age: number = 0;
  email: string = '';
  password: string = '';

  onClick() {
    if (this.email !== '' && this.password !== '' && this.name !== '' && this.age !== 0) {
      userStore.registerUser({
        email: this.email,
        password: this.password,
        name: this.name,
        age: this.age
      });
      alert('User registered, you may now log in');
    } else {
      alert('Fill inn all fields (age may be null)');
    }
    history.push('/');
  }

  onClickHome() {
    history.push('/');
  }

  render() {
    return (
      <div className="registerUserPage">
        <div className="registerUserDetails">
          <div className="registerUserPageDetails">
            <Button className="createArticleReturnBTN" onClick={this.onClickHome}>
              Return To HomePage
            </Button>
          </div>

          <Input
            type="email"
            className="regEmail"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={event => (this.email = event.target.value)}
          />
          <Input
            className="regPassword"
            placeholder="password"
            onChange={event => (this.password = event.target.value)}
          />
          <Input className="regName" placeholder="name" onChange={event => (this.name = event.target.value)} />
          <Input className="regAge" placeholder="age" onChange={event => (this.age = event.target.value)} />
          <Button className="submitArticleBTN" onClick={this.onClick}>
            Register
          </Button>
        </div>
      </div>
    );
  }
}

export default RegisterUser;
