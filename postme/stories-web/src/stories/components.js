import React,{useEffect,useState} from 'react';




function loadStories(callback){
  const xhr = new XMLHttpRequest();
  const method = "GET";
  const url = "http://localhost:8000/stories/";
  const responseType = "json";
  xhr.responseType = responseType;
  xhr.open(method,url);
  xhr.onload = function(){
        callback(xhr.response,xhr.status);
  }
  xhr.onerror = function(e){
    callback({"message":"The request was an error"},400);
  }
  xhr.send();

  }

export function StoriesList(props){
    const [stories,setStories] = useState([]);
    useEffect(() =>{
        const myCallback = (response,status) => {
          if (status === 200){
            setStories(response);
          }else{
            alert('There was an error')
          }

        }
        loadStories(myCallback);

      },[])
    return stories.map((item,index)=>{
        return <Story story={item} key={`${index}-{item.id}`} className ='my-5 py-5 border bg-white text-dark' />
  })}



export function ActionBtn(props) {
  const {story,action} = props;
  const className = props.className ? props.className : 'btn btn-primary btn-sm';
  const display = action.type === 'like'? `${story.likes} ${action.display}`:action.display;
  return  <button className={className} > {display} </button>;
}
export function Story(props){
  const {story} = props;
  const className = props.className ? props.className:'col-10 mx-auto col-md-6';
  return <div className={className}>
    <p>{story.id} - {story.content}</p>
    <div className='btn btn-group'>
      <ActionBtn story={story} action={{type:"like",display:"Likes"}}></ActionBtn>
      <ActionBtn story={story} action={{type:"Unlike",display:"Unlike"}}></ActionBtn>
      <ActionBtn story={story} action={{type:"repost",display:"Repost"}}></ActionBtn>
    </div>
  </div>

}