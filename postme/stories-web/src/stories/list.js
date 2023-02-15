import React,{useEffect,useState} from 'react';

import {apiStoriesList} from './lookup'
import {Story} from './details'



export function StoriesList(props){
    const [storiesInit,setStoriesInit] = useState([]);
    const [stories,setStories] = useState([]);
    const [storiesDidSet,setStoriesDidSet] = useState(false)
    useEffect(()=>{
      let final =[...props.newStories].concat(storiesInit);
      if (final.length !== stories.length){
        setStories(final);
      }

    },[props.newStories,storiesInit,stories])
    useEffect(() =>{
        if (storiesDidSet === false){
          const handleStoriesLookup = (response,status) => {
            if (status === 200){
              setStoriesInit(response);
              setStoriesDidSet(true);
            }else{
              alert('There was an error')
            }
  
          }
          apiStoriesList(props.username,handleStoriesLookup);
        }

      },[storiesInit,storiesDidSet,setStoriesDidSet,props.username])
      const handleDidRepost =(newStory) =>{
        const updatedStories =[...storiesInit];
        updatedStories.unshift(newStory);
        setStoriesInit(updatedStories);
        const updateFinalStories = [...stories];
        updateFinalStories.unshift(newStory);
        setStories(updateFinalStories);
        
      
      }
      return stories.map((item,index)=>{

          return <Story 
          story={item} 
          didRepost = {handleDidRepost}
          className ='col-12 mb-3 border bg-white text-dark width=50%' 
          key={`${index}-{item.id}`}  />
  })}