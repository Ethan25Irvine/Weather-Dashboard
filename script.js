$(document).ready(function(){
    weatherData();
});
function weatherData(){
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=Boston&APPID=9be0a529a7dd200677c71e4ba94edd63&units=imperial";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {

      // Printing the entire object to console
      console.log(response);
    });
  }
