import React,{useEffect,useState} from 'react';
import {apiStoryDetails} from './lookup'
import { StoriesList } from './list';
import {StoryCreate} from './create'
import {Story} from './details'




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


export function StoryDetailComponent(props){
   const storyId = props.dataset.storyId;
   
   const [didLookup,setDidLookup] = useState(false);
   const [story,setStory] = useState(null);
   const handleBackupLookup = (response,status)=>{
    if (status === 200) {
      setStory(response)
    }else{
      alert('There was an error finding your Story');
    }

   }
   useEffect(()=>{
    if (didLookup === false){
      apiStoryDetails(storyId,handleBackupLookup);
      setDidLookup(true);


    }
   },[storyId,didLookup,setDidLookup])
  return story === null ? null:<Story story={story} className={props.className}/>
}








