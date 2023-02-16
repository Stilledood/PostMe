import {lookup} from '../lookup'


export function apiStoryCreate(newStory,callback){
    lookup("POST","stories/create-story",callback,{content:newStory});
}
  
  
export function apiStoryAction(storyId,action,content,callback){
    lookup("POST","stories/action",callback,{id:storyId,action:action,content:content});
}
  
export function apiStoriesList(username,callback){
    let endpoint = "stories/";
    if (username){
      endpoint = `stories/?username=${username}`;
}
lookup("GET",endpoint,callback)

}

export function apiStoryDetails(storyId,callback){

    let endpoint = `stories/${storyId}`
    lookup('GET',endpoint,callback)
}