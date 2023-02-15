import React from 'react';
import { apiStoryCreate } from './lookup';


export function StoryCreate(props){
  const {didPost} = props;
  
  console.log(didPost); 
  const textAreaRef = React.createRef();
  const handleBackendUpdate = (response,status) =>{
    if (status === 201){   
      didPost(response);
    }else{
      alert(`There was an eror: ${status}`)
    }

  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    const newValue = textAreaRef.current.value;
    apiStoryCreate(newValue,handleBackendUpdate);
    textAreaRef.current.value ='';
    
  }
  return  <div className={props.className}>
            <form onSubmit={handleSubmit}>          
              <textarea ref={textAreaRef} required={true} className='form-control' name='story'>
              </textarea>
              <button type='submit' className='btb btn-primary my-3' >Post</button>
            </form>           
          </div> 
               
}
