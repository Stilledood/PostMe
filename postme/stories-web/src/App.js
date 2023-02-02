import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';

import {Story,StoriesList,StoryComponent} from './stories';




function App() {
  
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          < StoryComponent />
        </div>
        <div>
          <StoriesList />
        </div>
        
      </header>
    </div>
  );
}

export default App;
