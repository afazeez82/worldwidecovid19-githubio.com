//adding the moment library for dates
moment().format('L');


function loadStorage() {
    if (localStorage.getItem("global_0" != null)) {
        var keyIndex = localStorage.length - 1;
        console.log(localStorage.getItem("global_" + keyIndex ))
    }
}



//Calling(integrating) the totals api
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-data.p.rapidapi.com/totals?format=json",
    "method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1",
        
       
    }
    
}

$.ajax(settings).done(function (response) {
    console.log(response);
    // $("#world").empty();
  
    var currentDate = moment().format('L');
    var dateEl = $("<p>");
    var worldHeaderEl = $("<h3> World Data </h3>");

    var displayCurrentDate = dateEl.append("Date: " + currentDate);
    var confirmedCaseEl = $("<p>").text("Confirmed: " + response[0].confirmed);
    var criticalCaseEl = $("<p>").text("Critical: " + response[0].critical);
    var totalDeathsEl = $("<p>").text("Deaths: " + response[0].deaths);
    var newDiv = $('<div>');
    newDiv.append(worldHeaderEl, displayCurrentDate, confirmedCaseEl, criticalCaseEl, totalDeathsEl );
    $("#world").html(newDiv);

    function appendStorage()
    {
        var keys = Object.keys(localStorage);
        localStorage.setItem('global_' + keys.length, JSON.stringify(response) )
    }    
    
    appendStorage();

});



//add nesting
$('#search-countries').on('submit', function(e){
    e.preventDefault();

    //ajax call here for COUNTRY SEARCH
    var countryName = $('#selected-country').val();
    // var date = moment().format('YYYY-M-DD'); // 08/15/2020     2020-Aug-15 aug
    var settingsCountry = {
        "async": true,
        "crossDomain": true,
        // "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=%3Crequired%3E",
        //https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-Aug-15&name=italy
        "url": "https://covid-19-data.p.rapidapi.com/country?format=json&name=" + countryName,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
            "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
        }
    }
        
        $.ajax(settingsCountry).done(function (response) {
        console.log(response);

        $("#country-data").empty();
        var countryHeaderEl = $("<h3>" + countryName + "</h3>");
        var countryConfirmedCasesEl = $("<p>").text("Confirmed: " + response[0].confirmed);
        var countryCriticalEl = $("<p>").text("Critical: " + response[0].critical);
        var countryDeathsEl = $("<p>").text("Deaths: " + response[0].deaths);
        var newDiv = $('<div>');
        newDiv.append(countryHeaderEl, countryConfirmedCasesEl, countryCriticalEl, countryDeathsEl);
        $("#country-data").html(newDiv);


        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&country="+ countryName +"&q=covid",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
                "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
        });
        

        

    });

});






function chartInfo() {
    var keyIndex = localStorage.length - 1;
    var confirmed = localStorage.getItem("global_" + keyIndex);
    confirmed 
    var chart = $('#global-chart');
    var myChart = new Chart(chart, {
    type: 'bar',
    data: {
        labels: [, 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}

chartInfo();
//-----
