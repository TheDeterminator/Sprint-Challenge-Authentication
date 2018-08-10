import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Authentication from './components/Authentication';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/jokes',{
      headers: {
        authorization: localStorage.getItem('token')
      }
    }).then(response => {
      this.setState({jokes: response.data})
    }).catch(err => {
      console.log('Ur error', err);
    });
  }

  handleLogout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <div>
          {this.state.jokes.length > 0 ? this.state.jokes.map(joke => {
            return <div key={joke.id}><h1>{joke.setup}</h1><i>{joke.punchline}</i></div>
          }):"Loading..."}
          </div>
          <div>
          {<button onClick={this.handleLogout} className="logout-button">Log Out</button>}
          </div>
      </div>
    );
  }
}

export default Authentication(App);
