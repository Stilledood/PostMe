import logo from './logo.svg';
import './App.css';
import React ,{useEffect,useState} from 'react';

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
      console.log(response)
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
        <p>
          {stories.map((story,index) => {
            return <li> {story.content}</li>
          })}
        </p>
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
