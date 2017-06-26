var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/15Ef6P5kxa05HltX1_HavkRCz4mftnF5EzjBmuLmNf3w/pubhtml';

function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
}

function showInfo(data, tabletop) {
    alert('Successfully processed!');
    console.log(data);
    //console.log(tabletop.sheets());
    
    data.forEach(function(dataElement){
        var h1 = document.createElement('h1');
        h1.innerHTML = dataElement.Name + " (" + dataElement.Category + ") - Healthiness: " + dataElement.Healthiness;
        document.querySelector('body').appendChild(h1);
    });
}

window.addEventListener('DOMContentLoaded', init);

