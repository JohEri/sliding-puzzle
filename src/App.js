import React, { useState } from 'react';
import Board from './Board';
import './App.css';

function App() {
  const [ rowLength ] = useState(3);

  return (
    <div className="App">
      <Board rowLength={rowLength} />
    </div>
  );
}

export default App;
