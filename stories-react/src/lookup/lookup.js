


 export function loadStories(callback){
    const xhr = new XMLHttpRequest()
    const method = "GET"
    const endpoint = "http://127.0.0.1:8000/stories/"
    const responseType = "json"
  
    xhr.responseType = responseType
    xhr.open(method,endpoint)
    xhr.onload = function () {
        callback(xhr.response,xhr.status)
    }
    xhr.onerror = function(e){
        callback({"message":"The request was an error"},400)

    }
    xhr.send()
  }