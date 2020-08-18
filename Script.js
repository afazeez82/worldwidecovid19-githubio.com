//adding the moment library for dates
var currentDate = moment().format('L');

function loadStorage() {
    var keys = Object.keys(localStorage)
    
    var historicalLI = $(`<li>`);
   

    for (i=0; i < keys.length; i++){
        console.log(keys[i]);
        if (keys[i] != 'global') {
            historicalLI = $(`<li><button class="uk-button uk-button-default">${keys[i]}</button></li>`);
            historicalLI.attr('data-id', keys[i]);
            historicalLI.attr('class', "historicalCountryName");
            $(".historical-ul").prepend(historicalLI);
            
        }
       
    }
    
}   

loadStorage();

function searchCountryName(countryName) {

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
        var dateEl = $("<p>");
        var countryDisplayCurrentDate = dateEl.append("Date: " + currentDate);
        var countryHeaderEl = $("<h3>" + countryName + "</h3>");
        var countryConfirmedCasesEl = $("<p>").text("Confirmed: " + response[0].confirmed);
        var countryCriticalEl = $("<p>").text("Critical: " + response[0].critical);
        var countryDeathsEl = $("<p>").text("Deaths: " + response[0].deaths);
        var countryRecoveredEl = $("<p>").text("Recovered: " + response[0].recovered);
        var newDiv = $('<div>');
        newDiv.append(countryHeaderEl, countryDisplayCurrentDate, countryConfirmedCasesEl, countryCriticalEl, countryDeathsEl, countryRecoveredEl);
        $("#country-data").html(newDiv);

        //Add current search to localStorage
        var keys = Object.keys(localStorage)
        var keysIndex = keys.length - 1;
        localStorage.setItem(countryName, JSON.stringify(response));
        // localStorage.setItem('country_' + keysIndex, JSON.stringify(response));

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
            $("#news-articles").empty();
            // var newsArticles = $(`<li>`)
            for (i = 4; i >= 0; i--) {
                var results = response.articles[i].title
                var links = response.articles[i].link
                $("#news-articles").prepend(`<li><a href='${links}' target="_blank"> ${results} </a> </li>`)
            }
 
        
    });
    
    countryChart(countryName);

});

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

    var dateEl = $("<p>");
    var worldHeaderEl = $("<h3> World Data </h3>");

    var displayCurrentDate = dateEl.append("Date: " + currentDate);
    var confirmedCaseEl = $("<p>").text("Confirmed: " + response[0].confirmed);
    var criticalCaseEl = $("<p>").text("Critical: " + response[0].critical);
    var totalDeathsEl = $("<p>").text("Deaths: " + response[0].deaths);
    var totalRecoveredEl = $("<p>").text("Recovered: " + response[0].recovered);
    var newDiv = $('<div>');
    newDiv.append(worldHeaderEl, displayCurrentDate, confirmedCaseEl, criticalCaseEl, totalDeathsEl, totalRecoveredEl );
    $("#world").html(newDiv);

    function appendStorage()
    {
        var keys = Object.keys(localStorage);
        var keysIndex = keys.length
        localStorage.setItem('global', JSON.stringify(response))
    }    
    
    appendStorage();
    chartInfo();
});



//add nesting
$('#search-countries').on('submit', function(e){
    e.preventDefault();

    //ajax call here for COUNTRY SEARCH
    var countryName = $('#selected-country').val();
    // var date = moment().format('YYYY-M-DD'); // 08/15/2020     2020-Aug-15 aug

    
searchCountryName(countryName)
var historicalLI = $(`<li><button class="uk-button uk-button-default">${keys[i]}</button></li>`);
historicalLI.attr('data-id', countryName);
historicalLI.attr('class', "historicalCountryName");
$(".historical-ul").prepend(historicalLI);

});




//clicking historical button search brings up data
$(document).on("click", ".historicalCountryName", function(){
    var previousResults = $(this).attr("data-id");
    searchCountryName(previousResults);
    // countryChart(countryName);
    console.log(previousResults);
})

function chartInfo() {
    var keys = Object.keys(localStorage);
   
    // var countryStorage = localStorage.getItem('country_' + keysIndex);
    var cases = JSON.parse(localStorage.getItem("global"));

    
    console.log(cases);
    // newCases = Array.from(cases);
    // console.log(newCases);
    var confirmed = cases[0].confirmed;
    console.log('confirmed ' + confirmed.toLocaleString());
    var critical = cases[0].critical; 
    var deaths = cases[0].deaths; 
    var recoveries = cases[0].recovered; 
    var chart = $('#global-chart');
    var myChart = new Chart(chart, {
    type: 'horizontalBar',
    data: {
        labels: ['Confirmed', 'Critical', 'Deaths', 'Recovered'],
        datasets: [{
            label: '# of Cases Worldwide',
            data: [confirmed, critical, deaths, recoveries],
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

function countryChart(countryName){

var ctx = document.getElementById('country-chart');
var cases = JSON.parse(localStorage.getItem(countryName));
var countryConfirmed = cases[0].confirmed;
var countryCritical = cases[0].critical;
var countryDeaths = cases[0].deaths;
var countryRecovered = cases[0].recovered;

var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    onAnimationComplete: function () {

        var ctx = this.chart.ctx;
        ctx.font = this.scale.font;
        ctx.fillStyle = this.scale.textColor
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
    },
    data: {
        labels: ['Confirmed', 'Critical', 'Deaths', 'Recovered'],
        datasets: [{
            label: '# of Cases Countrywide',
            data: [countryConfirmed, countryCritical, countryDeaths, countryRecovered],
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






function appendButton() {
    //look at local storage
    
    keys = Object.keys(localStorage);
    keysIndex = keys.length;
    

    for (i = 0; i < keysIndex; i++){
        var storage = JSON.parse(localStorage.getItem(keysIndex.value))
        historicalUL.prepend(`<li> ${storage} </li>`)
        console.log(storage);
        console.log('yellooooo')
    }
    //add button for each key !== "global"
    //append buttons to UL -- 
    
}




    
//-----
