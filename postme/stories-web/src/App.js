import logo from './logo.svg';
import './App.css';
import React,{useEffect,useState} from 'react';

import {Story} from './stories';


function loadStories(callback){
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/stories/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method,url);
  xhr.onload = function(){
        callback(xhr.response,xhr.status);
  }
  xhr.onerror = function(e){
    callback({"message":"The request was an error"},400);
  }
  xhr.send();

  } 



function App() {
  const [stories,setStories] = useState([]);
  useEffect(() =>{
    const myCallback = (response,status) => {
      if (status === 200){
        setStories(response);
      }else{
        alert('There was an error')
      }
     
    }
    loadStories(myCallback);
  
  },[]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          {stories.map((item,index)=>{
            return <Story story={item} key={`${index}-{item.id}`} className ='my-5 py-5 border bg-white text-dark' />
          })}
        </div>
        
      </header>
    </div>
  );
}

export default App;
