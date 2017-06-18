/* 1. Search */

var UI = {};

UI.EnterPress = function(){
    
};

UI.SubmitClick = function(){
    
};

/* 2. Query Soundcloud API */

var SoundCloudAPI = {};

SoundCloudAPI.init = function(){
    
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });    

};

SoundCloudAPI.init();

SoundCloudAPI.getTrack = function(inputValue){

    // find all sounds related to the inputValue string
    // if we find anything, THEN (promise) display track cards on screen
    SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });
    
};

SoundCloudAPI.getTrack("Rilo Kiley");


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

//restore playlist from previous session
var sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem('savedTracks');

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




