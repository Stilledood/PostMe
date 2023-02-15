import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StoryComponent, StoryDetailComponent } from './stories';
import reportWebVitals from './reportWebVitals';


const storiesEl = ReactDOM.createRoot( document.getElementById('postme-stories'));
const storiesElement = document.getElementById('postme-stories');

storiesEl.render(
  <StoryComponent dataset = {storiesElement.dataset} />
)

const storyDetailElements = document.querySelectorAll('postme-detail');
for (let key in storyDetailElements){
  console.log(key)
}

console.log(storyDetailElements.length);

storyDetailElements.forEach(container =>{
  
  const containerEl = ReactDOM.createRoot(container);
  containerEl.render(
    <StoryDetailComponent dataset={container.dataset}/>
  )
})



//const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render(
  
    //<App />
  
//);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
