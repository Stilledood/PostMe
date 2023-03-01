import logo from './logo.svg';
import './App.css';
import React ,{useEffect,useState} from 'react';

import {Story} from "./stories"

function loadStories(callback){
  const xhr = new XMLHttpRequest()
  const method = "GET"
  const endpoint = "http://127.0.0.1:8000/stories/"
  const responseType = "json"

  xhr.responseType = responseType
  xhr.open(method,endpoint)
  xhr.onload = function () {
      callback(xhr.response,xhr.status)
  }
  xhr.send()
}



function App() {
  const [stories,setStories] = useState([])
  
  useEffect(() => {
    const myCallback = (response,status) =>{
      setStories(response)
      
    }
    loadStories(myCallback)

  },[])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          {stories.map((item,index) => {
            return <Story story={item} key={index} className="my-5 py-4 border bg-white text-dark" />
          })}
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
