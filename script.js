$(document).ready(function(){
    basicWeatherData();
   
});
// saves the search into our console
  $('#search').click(function(){
    const citySearched = $(this).siblings('input').val().toUpperCase();
        localStorage.setItem('city', citySearched); 
        $('.mainArea').hide();
        $('.weatherDisplay').show();
  });

//   displays our basic information
function basicWeatherData(){
    const city = localStorage.getItem('city');
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=9be0a529a7dd200677c71e4ba94edd63&units=imperial";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
        const weatherTemp = response.main.temp;
        const weatherHumidity = response.main.humidity;
        const windSpeed = response.wind.speed;
        
        $('.weatherDisplay').append("<h1>"+ city +"</h1>");
        $('.weatherDisplay').append("<p>"+ weatherTemp +" Degrees </p>");
        $('.weatherDisplay').append("<p>"+ weatherHumidity +"% Humid </p>");
        $('.weatherDisplay').append("<p>"+ windSpeed +" MPH </p>");
      // Printing the entire object to console
      console.log(response);
    });
  }

//   $('.card').append("<p>"+  +" </p>");