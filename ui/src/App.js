import React from 'react';
import Header from './header/Header';
import GameArea from './game/gameArea';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <GameArea />
      </div>
    );
  }
}

export default App;
