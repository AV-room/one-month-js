//--FUNCTIONS--
function init() {
    
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: renderChart,
                     simpleSheet: true } );

}


function renderChart(data, tabletop) {
    
    //console.log("data:");
    //console.log(data);

    drawRegionsMap(data);

}


function drawRegionsMap(rawData) {
    
    //create an array of arrays and feed it to google charts
    var processedData = [];
    processedData.push(['Country', 'Cousin Marriages (%)']);
    //console.log(processedData);
    
    rawData.forEach(function(row){
        
        var arr = [row.Country, Number(row.Percent)];
        processedData.push(arr);
    
    });
    
    var data = google.visualization.arrayToDataTable(processedData);
    
    //chart config
    var options = {
                    colors: ['#e5e5ff', '#9999ff', '#6666ff', '3232ff', '#0000ff'],
                    values: [0.1, 2.0, 10.0, 20.0, 66.0],
                    defaultColor: 'blue'
                   };

    //instantiate and draw chart
    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);

}


//--MAIN--

//tabletop stuff
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1Zc8lWM3wZhPwO5Y01WGPSmSxSqdT74Xf5essNz16X4o/pubhtml';


//google charts stuff
//load the Visualization API and the chart package
google.charts.load('current', {
        'packages':['geochart'],
        'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
      });

google.charts.setOnLoadCallback(init);

