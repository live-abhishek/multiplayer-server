import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleAppBar from './SimpleAppBar';
import NicknameDialog from './dialog/NicknameDialog';

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
        <SimpleAppBar />
        <NicknameDialog />
      </div>
    );
  }
}

export default App;
