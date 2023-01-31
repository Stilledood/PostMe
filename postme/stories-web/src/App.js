import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';

import {Story,StoriesList} from './stories';




function App() {
  const [stories,setStories] = useState([]);
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <StoriesList />
        </div>
        
      </header>
    </div>
  );
}

export default App;
