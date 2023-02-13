import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';

import {StoryComponent,StoriesList} from './stories';




function App() {
  
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{width:'30vh'}}>
          <StoryComponent />
        </div>
        <div>
          
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
