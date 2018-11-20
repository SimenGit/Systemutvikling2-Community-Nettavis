// @flow

import React from 'react';
import { Component } from 'react-simplified';
import { history } from '../index';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class RightNav extends Component {
  dropdownOpen: boolean = false;
  category: string = '';

  onClickPost() {
    let userEmail = localStorage.getItem("userEmail");
    if (userEmail !== null) {
      history.push('/postArticle');
    } else {
      alert('You have to be logged in to use this feature');
    }
  }

  toggle() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onClickCategory(category: string) {
    history.push('/categoryArticle/' + category);
  }

  onClickDelete() {
    let userEmail = localStorage.getItem("userEmail");
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
      let userEmail = localStorage.getItem("userEmail");
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
                <DropdownItem onClick={() =>this.onClickCategory("food")}>Food</DropdownItem>
                <DropdownItem onClick={() =>this.onClickCategory("motor")}>Motor</DropdownItem>
                <DropdownItem onClick={() =>this.onClickCategory("nature")}>Nature</DropdownItem>
                <DropdownItem onClick={() =>this.onClickCategory("news")}>News</DropdownItem>
                <DropdownItem onClick={() =>this.onClickCategory("sports")}>Sports</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}

export default RightNav;
