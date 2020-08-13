// $.ajax({
//     url: queryURLforcast,
//     method: 'GET'
// }).then(function (response) {
//     console.log(response);
//     var results = response.list;
//     console.log(results.length);

    //Get the latest totals across the world:
//Request:
var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-19-data.p.rapidapi.com/totals?format=json",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com",
		"x-rapidapi-key": "839906499fmsh2b527dd8c5ac97dp144417jsnd5fa3c686fd1"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
})
