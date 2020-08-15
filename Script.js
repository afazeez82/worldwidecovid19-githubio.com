//adding the moment library for dates
moment().format('L');


// function loadStorage() {
//     if (localStorage.getItem("global" != null)) {
//         // var keyIndex = localStorage.length - 1;
//         console.log(localStorage.getItem("global")
//     }
// }


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
        localStorage.setItem('global', JSON.stringify(response) )
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
            //ISCODE HERE
        var countryCode = (response[0].code);
        console.log(countryCode);
        $("#country-data").empty();
        var countryHeaderEl = $("<h3>" + countryName + "</h3>");
        var countryConfirmedCasesEl = $("<p>").text("Confirmed: " + response[0].confirmed);
        var countryCriticalEl = $("<p>").text("Critical: " + response[0].critical);
        var countryDeathsEl = $("<p>").text("Deaths: " + response[0].deaths);
        var newDiv = $('<div>');
        newDiv.append(countryHeaderEl, countryConfirmedCasesEl, countryCriticalEl, countryDeathsEl);
        $("#country-data").html(newDiv);



        //latest country news
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-news.p.rapidapi.com/v1/covid?lang=en&media=True&country="+ countryCode +"&q=covid",
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "covid-19-news.p.rapidapi.com",
                "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
            }
        }
        
        $.ajax(settings).done(function (response) {
            console.log(response);
            console.log(response.articles[0].link);
            console.log(response.articles[0].summary)

            $("#news-articles").em
            var article1El = $("<p>").text(response.articles[0].summary)
            var newDivArticle = $('<div>');

            
        });
        
        

    });

});






function chartInfo() {
    // var keyIndex = localStorage.length - 1;
    var cases = localStorage.getItem("global");
    
    newCases = JSON.parse(cases);
    console.log(newCases);
    // newCases = Array.from(cases);
    // console.log(newCases);
    var confirmed = newCases[0];
    console.log('confirmed ' + confirmed);
    var critical = cases[0].critical; 
    var deaths = cases[0].deaths; 
    var recoveries = cases[0].recovered; 
    var chart = $('#global-chart');
    var myChart = new Chart(chart, {
    type: 'bar',
    data: {
        labels: ['Confirmed', 'Critical', 'Deaths', 'Recovered'],
        datasets: [{
            label: '# of Cases',
            data: [`${confirmed}, ${critical}, ${deaths}, ${recoveries}`],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
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
