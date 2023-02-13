import React,{useEffect,useState} from 'react';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}


function lookup(method,endpoint,callback,data){
  let jsonData;
  if (data){
     jsonData = JSON.stringify(data);
     console.log(jsonData)
  }

  const xhr = new XMLHttpRequest();
  const url = `http://localhost:8000/${endpoint}`;
  const responseType = 'json';
  xhr.responseType = responseType;
  const csrftoken = getCookie('csrftoken');
  xhr.open(method,url)
  
  if (csrftoken){
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    xhr.setRequestHeader("x-requested-with","XMLHttpRequest");
    xhr.setRequestHeader('X-CSRFToken',csrftoken);
  }
  
  xhr.onload=function(){
    callback(xhr.response,xhr.status);
  }
  xhr.onerror = function(e){
    callback({"message":"The request has an error"},400);
  }
  xhr.send(jsonData);
}


export function apiStoryCreate(newStory,callback){
  lookup("POST","stories/create-story",callback,{content:newStory});
}


export function apiStoryAction(storyId,action,content,callback){
  lookup("POST","stories/action",callback,{id:storyId,action:action,content:content});
}

export function apiStoriesList(callback){
  lookup("GET","stories/",callback)

}

export function StoryComponent(props) {
  const textAreaRef = React.createRef();
  const [newStories,setNewStories] = useState([]);
  const handleBackendUpdate = (response,status) =>{
    let tempNewStories =[...newStories]
    if (status === 201){
      tempNewStories.unshift(response)
      setNewStories(tempNewStories);
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

  return <div className={props.className}> 
            <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>          
              <textarea ref={textAreaRef} required={true} className='form-control' name='story'>
              </textarea>
              <button type='submit' className='btb btn-primary my-3' >Post</button>
            </form>           
            </div>
            <StoriesList newStories ={newStories}/> 
        </div>
          

}

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
          apiStoriesList(handleStoriesLookup);
        }

      },[storiesInit,storiesDidSet,setStoriesDidSet])
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
        </div> }
      
    </div>
       
    
  

}