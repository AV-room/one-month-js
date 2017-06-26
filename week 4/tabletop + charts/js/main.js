//declare namespaces
var tabletop = {};
var googleCharts = {};

var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/15Ef6P5kxa05HltX1_HavkRCz4mftnF5EzjBmuLmNf3w/pubhtml';
 
var pizzaData = [
        ['Topping', 'Slices'],
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2]
    ];


//TABLETOP
tabletop.init = function(publicSpreadsheetUrl){
    console.log("tabletop.init");
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: tabletop.showInfo(pizzaData),
                     simpleSheet: true } );
};


tabletop.showInfo = function(data, tabletop) {
    console.log("tabletop.showinfo");
    //alert('Successfully processed!');
    console.log(data);
    //console.log(tabletop.sheets());
    
//    data.forEach(function(dataElement){
//        var h1 = document.createElement('h1');
//        h1.innerHTML = dataElement.Name + " (" + dataElement.Category + ") - Healthiness: " + dataElement.Healthiness;
//        document.querySelector('body').appendChild(h1);
//    });
    
    googleCharts.drawChart(pizzaData);
}


//GOOGLE CHARTS


googleCharts.init = function(){
    console.log("googleCharts.init");
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(tabletop.init());

    // Callback that creates and populates a data table, 
    // instantiates the pie chart, passes in the data and
    // draws it.
   
  
};

googleCharts.drawChart = function(rawData) {
    console.log("googleCharts.drawChart");
    /*// Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Slices');
    data.addRows([
      ['Mushrooms', 3],
      ['Onions', 1],
      ['Olives', 1],
      ['Zucchini', 1],
      ['Pepperoni', 2]
    ]);*/

    // Parse columns and rows from data parameter (array of arrays)
    // Assume first row is header row
    // Assume first val in first row: string
    // Assume second val in first row: number
    var processedData = new google.visualization.DataTable();
    rawData.forEach(function(currentRow, i){
        if(i > 0){
            //parse data
            processedData.addRow(currentRow);
        }
        else{
            //parse header row
            processedData.addColumn('string', rawData[0][0]);
            processedData.addColumn('number', rawData[0][1]);
        }
    });

    console.log("processed data: " + processedData);

    // Set chart options
    var options = {'title':'How Much Pizza I Ate Last Night',
                   'width':400,
                   'height':300};

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    chart.draw(processedData, options);
}



window.addEventListener('DOMContentLoaded', googleCharts.init());



