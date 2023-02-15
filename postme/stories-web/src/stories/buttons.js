import React from "react";
import {apiStoryAction} from './lookup'


export function ActionBtn(props) {
    const {story,action,didPerformAction} = props;
    const className = props.className ? props.className : 'btn btn-primary btn-sm';
    const actionDisplay = action.display ? action.display:"Action";
    const likes = story.likes ? story.likes : 0;
    const handleActionEvent = (response,status) =>{ 
      if ((status === 200 || status === 201) && didPerformAction){
        didPerformAction(response,status);
      }
    }
    const handleClick = (event) =>{
      event.preventDefault();
      let storyPk = story.id ? story.id:story.pk
      apiStoryAction(storyPk,action.type,story.content,handleActionEvent);
      
    };
      
    const display = action.type === 'like'? `${likes} ${actionDisplay}`:actionDisplay;
    return  <button className={className} onClick={handleClick} > {display} </button>;
  }