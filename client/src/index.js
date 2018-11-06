// @flow

import ReactDOM from 'react-dom';
import React from 'react';
import {Component} from 'react-simplified';

import axios from 'axios';
axios.interceptors.response.use(response => response.data);


class Lol extends Component{
    username = '';
    idInput = 0;
    render() {
        return (
            <div>
                <input onChange={event => this.idInput = event.target.value}/>
                <button onClick={this.onClick}> Se navnet på brukeren</button>
                Navnet på user  er {this.username}
            </div>
        );
    }
    onClick() {
        axios.get(`/users/${this.idInput}`).then(data =>{
            console.log(data[0].name);
            this.username = data[0].name
    });
    }
}


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
        <Lol/>,
    root
  );
