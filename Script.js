
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-data.p.rapidapi.com/totals?format=json",
    "method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
        "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1",
        "Retry-After": "120"
       
    }
    
}

$.ajax(settings).done(function (response) {
    console.log(response);
    
    // var countryName = "Italy"
    // var date = "2020-04-01"
    // var settingsCountry = {
    //     "async": true,
    //     "crossDomain": true,
    //     // "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=%3Crequired%3E",
    //     "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name="+ countryName ,
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
    //         "x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
    //     }
    // }
    
    // $.ajax(settingsCountry).done(function (response) {
    //     console.log(response);
    // });



});



//add nesting

var countryName = "Italy"
var date = "2020-04-01"
var settingsCountry = {
	"async": true,
	"crossDomain": true,
    // "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name=%3Crequired%3E",
    "url": "https://covid-19-data.p.rapidapi.com/report/country/name?date-format=YYYY-MM-DD&format=json&date=2020-04-01&name="+ countryName ,
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
	}
}

$.ajax(settingsCountry).done(function (response) {
	console.log(response);
});