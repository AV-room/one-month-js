/*1. Get user's input */

//add click event to register user's input and start processing
var button = document.querySelector(".js-go");
button.addEventListener("click", function(){
    
    var input = document.querySelector(".js-userinput").value;
    console.log(input);
    
    //show the output in the img panel using function call
    pushToDOM(input);

});


/*2. Connect to API */

/*3. Show the GIFs */

function pushToDOM(thingToPush){

    var imgPanel = document.querySelector(".js-container");
    imgPanel.innerHTML = thingToPush;

}