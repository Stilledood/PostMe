import React, {useState} from "react";

import {ActionBtn} from './buttons'

export function StoryParent(props){
    const {story,didRepost} = props;
    return story.original_story ? <div className='row'>
      <div className='col-11 mx-auto  p-3 border rounded'>
      <p className='mb-0 text-muted small'>Repost</p>
      <Story hideActions  className={' '} story={story.original_story}/> 
      </div>
    </div> : null
  }
  export function Story(props){
    const {story,didRepost,hideActions} = props;
    const className = props.className ? props.className:'col-10 mx-auto col-md-8';
    const [actionStory,setActionStory] = useState(props.story ? props.story:null);
    const path = window.location.pathname;
    const idRegex = /(?<storyid>\d+)/ ;
    const match = path.match(idRegex);
    const urlStoryId = match ? path.match(idRegex).groups.storyid : -1;
    const isDetail = `${urlStoryId}` === `${story.id}`
    const handleLink = (event) =>{
      event.preventDefault();
      window.location.href = `/${story.id}`
      

    }
    const handlePerformAction = (newActionStory,status) =>{
      if (status === 200){
        setActionStory(newActionStory);
      }else if (status === 201){
        if (didRepost){
          didRepost(newActionStory);
        }
      }
      
    }
  
    return <div className={className}>
          <div>
            <p>{story.pk} {story.id} - {story.content}</p>
            <StoryParent story={story} />
  
          </div>
          
          {(actionStory && hideActions !== true) && <div className='btn btn-group'>
            <ActionBtn story={actionStory} didPerformAction={handlePerformAction} action={{type:"like",display:"Likes"}}></ActionBtn>
            <ActionBtn story={actionStory} didPerformAction={handlePerformAction} action={{type:"Unlike",display:"Unlike"}}></ActionBtn>
            <ActionBtn story={actionStory} didPerformAction={handlePerformAction} action={{type:"repost",display:"Repost"}}></ActionBtn>
            {isDetail === true ? null :<button className="btn btn-outline-primary" onClick={handleLink}>View</button>}
          </div> }
        
      </div>
         
      
    
  
  }