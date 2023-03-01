import React from "react";


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