import React from 'react';
import Header from './header/Header';
import GameArea from './game/gameArea';
import './App.css';


const App = () => {
  return (
    <div className="App">
      <Header />
      <GameArea />
    </div>
  );
}

export default App;
