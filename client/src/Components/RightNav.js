// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class RightNav extends Component {
  dropdownOpen = false;
  category = null;

  onClickPost() {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail !== null) {
      history.push('/postArticle');
    } else {
      alert('You have to be logged in to use this feature');
    }
  }

  toggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onClickFood() {
    let category = 'food';
    localStorage.setItem('category', category);
    history.push('/categoryArticle');
  }
  onClickMotor() {
    let category = 'motor';
    localStorage.setItem('category', category);
    history.push('/categoryArticle');
  }
  onClickNews() {
    let category = 'news';
    localStorage.setItem('category', category);
    history.push('/categoryArticle');
  }
  onClickSports() {
    let category = 'sport';
    localStorage.setItem('category', category);
    history.push('/categoryArticle');
  }
  onClickNature() {
    let category = 'nature';
    localStorage.setItem('category', category);
    history.push('/categoryArticle');
  }

  onClickDelete() {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail !== null) {
      history.push('/deleteArticle');
    } else {
      alert('You have to be logged in to use this feature');
    }
  }

  onClickRegisterUser() {
    history.push('/registerUser');
  }

  onClickUpdate() {
    var userEmail = localStorage.getItem('userEmail');
    if (userEmail !== null) {
      history.push('/updateArticle');
    } else {
      alert('You have to be logged in to use this feature');
    }
  }

  render() {
    return (
      <div id="mySidenav" className="sidenav">
        <div className="side-Buttons">
          <div className="btn1">
            <Button className="button1" onClick={this.onClickPost}>
              Post article
            </Button>
          </div>
          <div className="btn2">
            <Button className="button2" onClick={this.onClickDelete}>
              Delete article
            </Button>
          </div>
          <div className="btn3">
            <Button className="button3" onClick={this.onClickUpdate}>
              Update article
            </Button>
          </div>
          <div className="btn4" onClick={this.onClickRegisterUser}>
            <Button className="button4">Register user</Button>
          </div>
          <div className="btn5">
            <ButtonDropdown className="menuDropDownOver" isOpen={this.dropdownOpen} toggle={this.toggle}>
              <DropdownToggle className="menuDropDown" caret>
                Categories
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={this.onClickFood}>Food</DropdownItem>
                <DropdownItem onClick={this.onClickMotor}>Motor</DropdownItem>
                <DropdownItem onClick={this.onClickNature}>Nature</DropdownItem>
                <DropdownItem onClick={this.onClickNews}>News</DropdownItem>
                <DropdownItem onClick={this.onClickSports}>Sports</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default RightNav;
