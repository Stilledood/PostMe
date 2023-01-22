const xhr = new XMLHttpRequest();
const method = "GET";
const url = "/stories";
const responseType = "json";
const storiesElement = document.getElementById("tweets");

// function to format stories output
function formatStoriesElement(story){
    return `<div class="mb-4" id="story-${story.id}">
                <p>${story.content}</p>
            </div> `
    
}


xhr.responseType = responseType;
xhr.open(method,url);
xhr.onload = function(){
    const serverResponse = xhr.response;
    let listedItems = serverResponse.response;
    let finalStoryString = '';
    for (let i = 0;i < listedItems.length;i++){
        let item = formatStoriesElement(listedItems[i]);
        finalStoryString += item;
    }

    storiesElement.innerHTML = finalStoryString;

    
}
xhr.send();