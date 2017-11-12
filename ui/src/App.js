import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  componentDidMount() {
    fetch('/hello')
      .then(res => res.text())
      .then(text => this.setState({ text }));
  }

  render() {
    return (
      <div className="App">
        <div>{this.state.text}</div>
      </div>
    );
  }
}

export default App;
