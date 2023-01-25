

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
    console.log(myFormData);
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



