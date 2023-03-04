import React ,{useEffect,useState} from 'react';
import {loadStories} from '../lookup';



export function StoriesList (props){
    const [stories,setStories] = useState([])
    useEffect(() => {
      const myCallback = (response,status) =>{
        if (status === 200){
            setStories(response)
        }else{
            alert("There was an error")
        }
        
      }
      loadStories(myCallback)
    },[])
  
    return stories.map((item,index) => {
      return <Story story={item} key={index} className="my-5 py-4 border bg-white text-dark" />
    })
  
}
  

export function ActionBtn(props){
    const {story,action} = props
    const [likes,setLikes] = useState(story.likes ? story.lies:0)
    const className = props.className ? props.className : "btn btn-primary btn-sm"
    const actionDisplay = action.display ? action.display:"Action"
    const display = action.type === "like" ? `${likes} - ${actionDisplay}`: actionDisplay
    const handleClick = (event) =>{
      event.preventDefault()
      if (action.type === "like"){
        setLikes(story.likes + 1)
      }

    }

    return <button className={className} onClick={handleClick} >{display}</button>
}
  
export function Story(props) {
    const {story} = props
    const className = props.className ? props.className: "col-10 mx-auto cold-md-6"
    return <div className={className}>
        <p>{story.id} - {story.content}</p>
        <div className="btn btn-group">
        <ActionBtn story={story} action={{type:"like", display:"Likes"}} />
        <ActionBtn story={story} action={{type:"unlike", display:"Unlike"}} />
        <ActionBtn story={story} action={{type:"repost", display:"Repost"}} />
        </div>
    </div>
}