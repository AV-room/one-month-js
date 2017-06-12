//add click event to button to register user's input and start processing
document.querySelector(".js-go").addEventListener("click", function(){
    
    //get user's input
    var input = document.querySelector(".js-userinput").value;
    //console.log(input);
    
    getGIPHYs(input);

});

//also start processing user's input if they press enter
document.querySelector(".js-userinput").addEventListener("keyup", function(e){
    
    var input = document.querySelector(".js-userinput").value;
    
    //get user's input only once they've pressed ENTER key
    if(e.which === 13){
        //console.log(input);
        
        getGIPHYs(input);
    }

});


//requests content via call to GIPHY API then renders GIPHYs on screen
function getGIPHYs(userInput){
    
    var url = "http://api.giphy.com/v1/gifs/search?q=" + userInput + "&api_key=dc6zaTOxFJmzC";

    // send an AJAX Request including our hardcoded URL
    var GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();

    //wait until the response has been fully loaded into GiphyAJAXCall before processing
    GiphyAJAXCall.addEventListener('load', function(e){
    
        var response = e.target.response;
        pushToDOM(response);

    });
}


//renders GIPHYs in image panel
function pushToDOM(thingToParseAndPush){

    //don't forget to clear image panel before rendering new content
    var imgPanel = document.querySelector(".js-container");
    imgPanel.innerHTML = "";
    
    //parse response into object array
    var response = JSON.parse(thingToParseAndPush);
    //console.log(response);
    
    var imgObjects = response.data;
    
    imgObjects.forEach(function(imgObject){

        // extract the img url
        var imgUrl = imgObject.images.fixed_height.url;
        //console.log(imgUrl);
   
        // then create new img tag for that url 
        // and concatenate onto existing imgPanel innerHTML string
        imgPanel.innerHTML = imgPanel.innerHTML + "<img class='container-image' src='" + imgUrl + "'/>";

    });
    
}