const xhr = new XMLHttpRequest();
const method = "GET";
const url = "/stories";
const responseType = "json";
const storiesElement = document.getElementById("tweets");

// function to automatically add a like button to every story
function likeBtn(){
    return "<button class='btn btn-primary'>Like</button>"
}

// function to format stories output
function formatStoriesElement(story){
    return `<div class="col-12  col-md-10 mx-auto border rounded py-3 mb-4 story" id="story-${story.id}">
                <p>${story.content}</p>
                <div class='btn-group'>${likeBtn()}</div>
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