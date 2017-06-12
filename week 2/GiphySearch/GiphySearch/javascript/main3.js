/*1. Get user's input */

//add click event to button to register user's input and start processing
document.querySelector(".js-go").addEventListener("click", function(){
    
    var input = document.querySelector(".js-userinput").value;
    
    //show the output in the img panel using function call
    console.log(input);
    pushToDOM(input);

});

//also start processing user's input if they press enter
document.querySelector(".js-userinput").addEventListener("keyup", function(e){
    
    var input = document.querySelector(".js-userinput").value;
    
    //show the output in the img panel only once user has pressed ENTER key
    if(e.which === 13){
        console.log(input);
        pushToDOM(input);
    }

});


/*2. Request content using GIPHY API */

//using a hardcoded URL to start with
var url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";

// send an AJAX Request including our hardcoded URL
var GiphyAJAXCall = new XMLHttpRequest();
GiphyAJAXCall.open( 'GET', url );
GiphyAJAXCall.send();

//wait until the response has been fully loaded into GiphyAJAXCall before processing
GiphyAJAXCall.addEventListener('load', function(e){
    
    var response = e.target.response;
    console.log(response);

});


/*3. Show the GIFs */

function pushToDOM(thingToPush){

    var imgPanel = document.querySelector(".js-container");
    imgPanel.innerHTML = thingToPush;

}