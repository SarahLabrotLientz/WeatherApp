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
