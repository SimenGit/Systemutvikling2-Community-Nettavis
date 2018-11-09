import React from 'react';
import { Component } from 'react-simplified';

class RightNav extends Component {
    render() {
        return (
            <div id="mySidenav" className="sidenav">
                <div className = "side-Buttons">
                <button className = "form-control">Button</button>
                <button className = "form-control">Button</button>
                <button className = "form-control">Button</button>
                <button className = "form-control">Button</button>
                <input className = "form-control" type="text" placeholder="Search.."></input>
                    <button className = "form-control">Search</button>
                    <div className="dropdown">
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
                </div>
            </div>
        );
    }
}

export default RightNav;