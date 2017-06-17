/* 1. Search */

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
    SC.get('/tracks', {
        q: inputValue
    }).then(function(tracks) {
        console.log(tracks);
    });
    
};

SoundCloudAPI.getTrack("Rilo Kiley");

SoundCloudAPI.renderTracks = function(){
   
    //create empty div element
    var cardDiv = document.createElement('div');
    
    //add the 'card' class to our empty card div
    cardDiv.classList.add('card');
    
    //create image div
    var imageDiv = document.createElement('div');
    imageDiv.classList.add('image');
    
    var img = document.createElement('img');
    img.classList.add('image_img');
    img.src = 'http://www.placekitten.com/290/290';
    imageDiv.appendChild(img);
    
    cardDiv.appendChild(imageDiv);
    
    //create content div
    var contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    
    var header = document.createElement('div');
    header.classList.add('header');
    var a = document.createElement('a');
    a.href = 'https://soundcloud.com/barsuk-records/rilo-kiley-science-vs-romance';
    a.target = '_blank';
    a.innerHTML = 'Science Vs. Romance';
    header.appendChild(a);
    contentDiv.appendChild(header);
    
    cardDiv.appendChild(contentDiv);
    
    //create add-to-playlist div
    var addDiv = document.createElement('div');
    addDiv.classList.add('ui','bottom','attached','button','js-button')
    
    var i = document.createElement('i');
    i.classList.add('add','icon');
    addDiv.appendChild(i);
    
    var span = document.createElement('span');
    span.innerHTML = 'Add to playlist';
    addDiv.appendChild(span);
    
    cardDiv.appendChild(addDiv);
    
    
    //add the card div to the search results panel
    var searchResults = document.querySelector('.js-search-results');
    searchResults.appendChild(cardDiv);
    
    
};

SoundCloudAPI.renderTracks();

/* 3. Display the cards */

/* 4. Add to playlist and play */