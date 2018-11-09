import React from 'react';
import { Component } from 'react-simplified';

class FrontPageTop extends Component {
  render() {
    return (
      <div className="nav-wrapper">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" href="#">
                Brand
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default FrontPageTop;
