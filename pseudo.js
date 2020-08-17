$(document).ready(function(){

// url: https://covid-19-data.p.rapidapi.com/country?format=json&name=" + countryName,

});
/*
    Javascript Pseudocode

    This program utilizes two server-side API keys to gather COVID-19 related data concerning {city, country, etc.}

    var city
    var country
    var date 
    var current date
    var worldHeaderEl
    var dateEl
    var deaths
    var confirmed   
    var recovered
    var button

    AP1[openweather.api]
    AP2(third party)[openweather.api]

1. Input
    1. Input location using variable(city, country) name from the user in the search bar.
        Local Storage Search Selection

        function() {
        return this.city + ” ” + this.country;
    }
        function history() {
        window.history.back()(???????) Maybe ?

2.  Output
    1. Program displays dynamically updated data to user

    2. Data from API is largely comprised of current statistics in user’s selected location 
        Data is regularly updated
        Location index
        Local Storage Location Selection to display in history on side bar

        function history() {
        window.history.back()(???????) 

    3. Data is reflected in graphs, charts, etc.

    4. Sidebars include a COVID - 19 related media headlines
        Could incorporate into a rotating carousel - style featuring dynamically updated headlines
        Dynamically updated scrolling headlines

    5. Twitter feed[Example] - (Though I think this is more HTML)
        [<a href=“https://twitter.com/intent/tweet?button_hashtag=COVID&ref_src=twsrc%5Etfw”
        class=“twitter-hashtag-button” data-show-count=“false”> Tweet #COVID</a>
        <script async src=“https://platform.twitter.com/widgets.js” charset=“utf-8”></script>]
        








