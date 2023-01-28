// function to handle crsf Protect 
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

function handleStoriesCreateFormErrors(msg,display){
    let errorDiv = document.getElementById("story-create-form-error");
    if (display === true){
        // show error
        errorDiv.setAttribute("class","d-block alert alert-danger");
        errorDiv.innerText = msg;
    }
    else{
        // hide error
        errorDiv.setAttribute("class","d-none alert alert-danger");
    }

}



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
            myForm.reset();
        }
        else if (xhr.status === 400){
            const errorJson = xhr.response;
            const conterError = errorJson.content;
           
            let contentErrorMessage;
            if (conterError){
                contentErrorMessage = conterError[0];
                if (contentErrorMessage) {
                    handleStoriesCreateFormErrors(contentErrorMessage,true);
                }
                else{
                    alert("An error occured.Please try again later");
                }
            }
            else{
                alert("An error occured.Please try again later");
            }

        } else if (xhr.status === 500){
            alert('There was a problem on the server side');
        } else if (xhr.status === 403){
            alert('Please log in!');
            window.location.href = "/login"
        } else if (xhr.status === 401){
            alert('Please log in!');
            window.location.href = "/login";
        }
            
    }
    xhr.send(myFormData);

    

}

const storyCreateFormElement = document.getElementById("story-create-form");
storyCreateFormElement.addEventListener("submit",handleStoryFormCreate);
const storiesElement = document.getElementById("stories");

// function to handle like button press
function handleTweetActionBtn(storyId,currentCount){
    const csrftoken = getCookie('csrftoken');
    const url = "/stories/action";
    const method = "POST";
    const data = JSON.stringify({
        id : storyId,
        action : "like",
    });

    const xhr = new XMLHttpRequest();
    xhr.open(method,url)
    xhr.setRequestHeader("Content-Type","application/json");
    xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
    xhr.setRequestHeader("HTTP_X_REQUESTED_WITH","XMLHttpRequest");
    xhr.setRequestHeader('X-CSRFToken',csrftoken);
    xhr.onload = function(){
        console.log(xhr.status,xhr.response);
    }

    xhr.send(data);




}

// function to automatically add a like button to every story
function likeBtn(item){
    return "<button class='btn btn-primary btn-sm' onclick=handleTweetActionBtn(" + 
    item.pk + "," + item.likes + ",'like')>" + item.likes + " Likes</button>"



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
        let listedItems = serverResponse;
        let finalStoryString = '';
        for (let i = 0;i < listedItems.length;i++){
            let item = formatStoriesElement(listedItems[i]);
            finalStoryString += item;
        }

        storiesEl.innerHTML = finalStoryString;

        
    }
    
    xhr.send();

    }
// function to format stories output
function formatStoriesElement(story){
    let formattedStory = "<div class='col-12 col-md-10 mx-auto border rounded py-3 mb-4 story' id='stories" + story.pk
    + "'><p>" + story.content +
        "</p><div class='btn-group'>" +
            likeBtn(story)+"</div></div>"
    return  formattedStory
}

loadStories(storiesElement);



