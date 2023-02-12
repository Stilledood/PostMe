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


export function createStory(newStory,callback){

  lookup("POST","stories/create-story",callback,{content:newStory});

}

export function loadStories(callback){
  lookup("GET","stories/",callback)

}

export function StoryComponent(props) {
  const textAreaRef = React.createRef();
  const [newStories,setNewStories] = useState([]);
  
  const handleSubmit = (event) =>{
    event.preventDefault();
    const newValue = textAreaRef.current.value;
    
    createStory(newValue,(response,status)=>{
      if (status === 201){
        tempNewStories.unshift(response)
        setNewStories(tempNewStories);
      }else{
        alert(`There was an eror: ${status}`)
      }
    });
    let tempNewStories = [...newStories];
    
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
          const myCallback = (response,status) => {
            if (status === 200){
              setStoriesInit(response);
              setStoriesDidSet(true);
            }else{
              alert('There was an error')
            }
  
          }
          loadStories(myCallback);
        }

      },[storiesInit,storiesDidSet,setStoriesDidSet])
      return stories.map((item,index)=>{
          return <Story story={item}  className ='col-12 mb-3 border bg-white text-dark width=50%'  key={`${index}-{item.id}`}  />
  })}



export function ActionBtn(props) {
  const {story,action} = props;
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  const actionDisplay = action.display ? action.display:"Action";
  const [likes,setLikes] = useState(story.likes ? story.likes:0);
  const [justClicked,setJustClicked] =useState(false); 
  const handleClick = (event) =>{
    event.preventDefault();
    if (action.type === 'like'){
      if (justClicked === true){
        setLikes(likes-1);
        setJustClicked(false);        
      }else{
        setLikes(story.likes+1); 
        setJustClicked(true);
        console.log(justClicked);
      }     
    }
  };
    
  const display = action.type === 'like'? `${likes} ${actionDisplay}`:actionDisplay;
  return  <button className={className} onClick={handleClick} > {display} </button>;
}
export function Story(props){
  const {story} = props;
  const className = props.className ? props.className:'col-10 mx-auto col-md-8';
  return <div className={className}>
      <p>{story.id} - {story.content}</p>
        <div className='btn btn-group'>
          <ActionBtn story={story} action={{type:"like",display:"Likes"}}></ActionBtn>
          <ActionBtn story={story} action={{type:"Unlike",display:"Unlike"}}></ActionBtn>
          <ActionBtn story={story} action={{type:"repost",display:"Repost"}}></ActionBtn>
        </div>
      
    </div>
       
    
  

}