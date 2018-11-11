import React from 'react';
import { Component } from 'react-simplified';

class RightNav extends Component {
    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <div className = "side-Buttons">
                    <div className = "btn1">
                <button className = "form-control">Catagories</button>
                    </div>
                    <div className = "btn2">
                <button className = "form-control">Best rated</button>
                    </div>
                    <div className = "btn3">
                <button className = "form-control">Post article</button>
                    </div>
                    <div className = "btn4">
                <button className = "form-control">Delete article</button>
                    </div>
                    <div className = "btn5">
                    <button className = "form-control">User profile</button>
                    </div>
                    <div className = "btn6">
                <input className = "form-control" type="text" placeholder="Search.."></input>
                    <button className = "form-control">Search for articles</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default RightNav;

/*  dropdown:                <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown button
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>

                    */