//declare namespace objects
var UI = {};
var SoundCloudAPI = {};
var sideBar = document.querySelector('.js-playlist');


/* 0. Initialise player */

SoundCloudAPI.init = function(){
    
    //restore playlist from previous session
    if(localStorage.getItem('savedTracks') != null){
        sideBar.innerHTML = sideBar.innerHTML + localStorage.getItem('savedTracks');
    }
    
    //initialise SoundCloud connection params
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });    

}();


/* 1. Search listeners */

UI.SubmitClick = function(){
    
    document.querySelector('.js-submit').addEventListener('click', function(){
    
        //clear previous search results
        var searchResults = document.querySelector('.js-search-results').innerHTML = "";
        
        //get user's input
        var input = document.querySelector('.js-search').value;
    
        SoundCloudAPI.getTracks(input);

    });

}();

UI.EnterPress = function(){
    
    document.querySelector('.js-search').addEventListener("keyup", function(e){
        
        var input = document.querySelector('.js-search').value;
    
        //get user's input only once they've pressed ENTER key
        if(e.which === 13){
            
            //clear previous search results
            var searchResults = document.querySelector('.js-search-results').innerHTML = "";
            
            SoundCloudAPI.getTracks(input);
        
        }
    
    });

}();


/* BONUS: Clear playlist listener */

SoundCloudAPI.clearPlaylist = function(){
   
    document.querySelector('.js-clear').addEventListener('click', function(){
    
        //clear from local storage
        window.localStorage.clear();
        
        //clear from sidebar panel
        document.querySelector('.js-playlist').innerHTML = "";
    
    });
    
}();


/* 2. Query Soundcloud API */

SoundCloudAPI.getTracks = function(inputValue){

    // find all sounds related to the inputValue string
    // if we find anything, THEN (promise) display track cards on screen
    SC.get('/tracks', {
        
        q: inputValue
    
    }).then(function(tracks) {
    
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    
    });
    
};


/* 3. Display the cards */

SoundCloudAPI.renderTracks = function(tracks){
   
    tracks.forEach(function(track){
        
        //create card div
        var cardDiv = document.createElement('div');
        cardDiv.classList.add('card');

        //create image div
        var imageDiv = document.createElement('div');
        imageDiv.classList.add('image');

        var img = document.createElement('img');
        img.classList.add('image_img');
        img.src = track.artwork_url || 'http://lorempixel.com/100/100/abstract/'; //if no artwork found, display random image from lorempixel.com
        imageDiv.appendChild(img);

        //create content div
        var contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        var header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = '<a href=' + track.permalink_url + ' target="_blank">' + track.title + '</a>';

        /* creating the anchor tag (the longwinded way)
        var a = document.createElement('a');
        a.href = 'https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance';
        a.target = '_blank';
        a.innerHTML = 'Science Vs. Romance';
        header.appendChild(a);
        */

        contentDiv.appendChild(header);

        //create button div
        var buttonDiv = document.createElement('div');
        buttonDiv.classList.add('ui','bottom','attached','button','js-button')

        var icon = document.createElement('i');
        icon.classList.add('add','icon');
        buttonDiv.appendChild(icon);

        var buttonText = document.createElement('span');
        buttonText.innerHTML = 'Add to playlist';
        buttonDiv.appendChild(buttonText);
        
        /* WHY DOESN'T THIS WORK? */
        //buttonDiv.addEventListener('click', SoundCloudAPI.getEmbed());
        
        //add listener for button clicks
        buttonDiv.addEventListener('click', function(){ 
           SoundCloudAPI.getEmbed(track.permalink_url); 
        });

        //construct card div
        cardDiv.appendChild(imageDiv);
        cardDiv.appendChild(contentDiv);
        cardDiv.appendChild(buttonDiv);

        //add the card div to the search results panel
        var searchResults = document.querySelector('.js-search-results');
        searchResults.appendChild(cardDiv);
    
    });
    
};


/* 4. Add to playlist and play */

SoundCloudAPI.getEmbed = function(trackURL){
    
    SC.oEmbed(trackURL, {
    
        auto_play: true

    }).then(function(embed){
    
        console.log('oEmbed response: ', embed);
        
        var box = document.createElement('div');
        box.innerHTML = embed.html;
        
        //sideBar available here as it was declared outside of function
        sideBar.insertBefore(box, sideBar.firstChild);
        
        //cache playlist
        localStorage.setItem('savedTracks', sideBar.innerHTML);
    
    });
};



