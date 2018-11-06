import Article from "./Article";
import ReactDOM from 'react-dom';
import React from 'react';
import {Component} from 'react-simplified';

import axios from 'axios';
axios.interceptors.response.use(response => response.data);


class Lol extends Component {
  idInput = 0;

  state = {
    articles: {},
    username: ''
  };
  render() {
    return (
      <div className="search">
        <input onChange={event => (this.idInput = event.target.value)} />
        <button className="card-body" onClick={this.onClick}>
          {' '}
          Se navnet på brukeren
        </button>
        Navnet på user er {this.state.username}

          {this.state.articles.length > 0 &&
          this.state.articles.map(article => {
              return <Article article = {article}/>;
          })}

      </div>




    );
  }




  onClick() {
    axios.get(`/users/${this.idInput}`).then(data => {
      console.log(data[0].name);
      //set state trigger render metoden automatisk
      this.setState({ username: data[0].name });
    });
  }

  componentDidMount() {
    console.log('test');
    axios.get('/article').then(data => {
      console.log(data);
      //lagrer alle artikler i staten
      this.setState({ articles: data });
    });
  }
}

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
        <Lol/>,
    root
  );
