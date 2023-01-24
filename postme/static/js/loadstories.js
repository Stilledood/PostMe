
function handleStoryFormCreate(event){
    event.preventDefault();
    const myForm = event.target;
    const myFormData = new FormData(myForm);
    const url = myForm.getAttribute('action');
    const method = myForm.getAttribute('method');
    const xhr = new XMLHttpRequest();
    const responseType = "json";
    xhr.responseType = responseType;
    xhr.open(method,url);
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest");
    xhr.onload = function(){
        if (xhr.status === 201){
            const newStory = xhr.response;
            const formattedStory = formatStoriesElement(newStory);
            const ogHtml = storiesElement.innerHTML;
            storiesElement.innerHTML = formattedStory + ogHtml;
        }
        
        
    }
    xhr.send(myFormData);

    

}

const storyCreateFormElement = document.getElementById("story-create-form");
storyCreateFormElement.addEventListener("submit",handleStoryFormCreate);
const storiesElement = document.getElementById("stories");

// function to automatically add a like button to every story
function likeBtn(){
    return "<button class='btn btn-primary'>Like</button>"
}

// function to format stories output
function formatStoriesElement(story){
    return `<div class="col-12 border top border-bottom  py-3 mb-4 story" id="story-${story.id}">
                <p>${story.content}</p>
                <div class='btn-group'>${likeBtn()}</div>
            </div> `
    
}
function loadStories(storiesEl){
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "/stories";
    const responseType = "json";
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

        storiesEl.innerHTML = finalStoryString;

        
    }
    xhr.send();

    }

loadStories(storiesElement);



