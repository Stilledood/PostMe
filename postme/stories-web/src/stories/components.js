import React,{useEffect,useState} from 'react';
import { apiStoryCreate } from './lookup';
import { StoriesList } from './list';
import {StoryCreate} from './create'




export function StoryComponent(props) {
  
  const canPostDOM = props.dataset.canPost === 'false' ? false : true;
  const [newStories,setNewStories] = useState([]);
  const handleNewStory = (newStory) =>{
    let tempNewStories =[...newStories]
    tempNewStories.unshift(newStory)
    setNewStories(tempNewStories);
  }
  return <div className={props.className}> 
            {canPostDOM === true && <StoryCreate  didPost={handleNewStory} className='col-12 mb-3' />}        
            <StoriesList newStories={newStories} /> 
        </div>          
}









