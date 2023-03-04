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
    const className = props.className ? props.className : "btn btn-primary btn-sm"
    return action.type === 'like' ? <button className={className} >{story.likes} Likes</button>:null
}
  
export function Story(props) {
    const {story} = props
    const className = props.className ? props.className: "col-10 mx-auto cold-md-6"
    return <div className={className}>
        <p>{story.id} - {story.content}</p>
        <div className="btn btn-group">
        <ActionBtn story={story} action={{type:"like"}} />
        </div>
    </div>
}