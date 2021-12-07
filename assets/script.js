// event handling for submit and clear buttons
$('#search_btn').on('click', function(e) {
    e.preventDefault();
    
    showResults($('#city').val());
});

$('#clear_btn').on('click', function(e) {
    e.preventDefault();
    clearPastSearches();
});

// clear out search box when user clicks into it 
$('#city').on('focus', function() {
    $('#city').val('');
});

// show user the start page
displayStart();

// display initial start page
function displayStart() {
    $('#forecast_section').attr("style","display: none");
    $('#city_name').html("Welcome to the Weather Appstar");
    $('#city_content').html("Use search bar to find your forecast.");
    displayPastSearches();
}

// show data user requested 
function showResults(city) {
    var cityLat = '';
    var cityLong = '';

    // using promise to get coordinates and all weather data 
    fetch(getCoordinatesUrl, {mode: 'cors'})
        .then(function (response) {
            // Check the console first to see the response.status
            if(response.status != 200) {
                console.log(response.status);
                $('#city_name').html("Error!");
                $('#city_content').html("Your search was unsuccessful. Please try another city.");
            }
            return response.json();
        })    
  // getting all weather data with coordinates for second api
  .then(function (data) {
    cityLat = data[0].lat;
    cityLong = data[0].lon;

    forecastRequest = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityLat + '&lon=' + cityLong + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + apiKey;
 
    return fetch(forecastRequest, {mode: 'cors'});
 })
 .then(function(response) {
     if(response.status != 200) {
         $('#city_name').html("Error!");
         $('#city_content').html("Something went wrong. Please try another city.");
     }
     return response.json();     
    
    })
     // Sending weather data to page
     .then(function(data) { 
         displayToday(data,city); // display current weather info to page
         displayForecast(data,city); // display forecase to page
         addPastSearch(city); // add to list of stored searches
     });
}