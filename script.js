$(document).ready(function(){
    basicWeatherData();
    
});
// saves the search into our console
  $('#search').click(function(){
    const citySearched = $(this).siblings('input').val().toUpperCase();
    localStorage.setItem('city', citySearched); 
    basicWeatherData();
  });

//   displays our basic information
function basicWeatherData(){
  $('.weatherDisplay').empty();
    const city = localStorage.getItem('city');
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID=9be0a529a7dd200677c71e4ba94edd63&units=imperial";
    
    $.ajax({
      url: queryURL,
      method: "GET",
    })
    .done(function(response){
        const cityLat = response.coord.lat;
        const cityLon = response.coord.lon;
        const weatherTemp = response.main.temp;
        const weatherHumidity = response.main.humidity;
        const windSpeed = response.wind.speed;
        const currentIcon = response.weather[0].icon;
        const iconURL = "https://openweathermap.org/img/wn/"+currentIcon+"@2x.png"
        const currentDay = moment().format('l');

        $('.weatherDisplay').append("<h1>"+ city +" "+ currentDay+"</h1>");
        $('.weatherDisplay').append("<img src="+iconURL+">");
        $('.weatherDisplay').append("<p>Temperature: "+ weatherTemp +" <span> &#8457;</span></p>");
        $('.weatherDisplay').append("<p>Humidity: "+ weatherHumidity +"%</p>");
        $('.weatherDisplay').append("<p>Wind Speed: "+ windSpeed +" MPH </p>");
      // Printing the entire object to console
      console.log(response);
      const uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=9ba98b6f40ce7ad914af524232a14cbd&lat="+cityLat+"&lon="+cityLon+"";
    
      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function(uvResponse) {
        const uvIndex = uvResponse.value; 
        
        
        
        // change the back ground color for the uv index
        if (uvIndex <=2){
          bgClass = 'low'
        } else if (uvIndex <=5){
          bgClass = 'moderate'
        } else if (uvIndex <=7){
          bgClass = 'high'
        } else if (uvIndex <=10){
          bgClass = 'veryHigh'
        } else if(uvIndex >=11){
          bgClass = 'extreme'
        } 

        $('.weatherDisplay').append("<p>UV Index: <span class="+bgClass+">"+ uvIndex +"</span></p>");
        // Printing the entire object to console
        console.log(uvResponse);
      });

      const dayURL ='http://api.openweathermap.org/data/2.5/forecast?appid=9ba98b6f40ce7ad914af524232a14cbd&q='+city+'&units=imperial&cnt=6';
      $.ajax({
        url: dayURL,
        method: "GET",
      }).then(function(dayResponse) {
        $('.fiveDay').empty();
        const dayData = dayResponse.list;
        
        for (let i=1; i < dayData.length; i++){
          const futureIcon = dayResponse.list[i].weather[0].icon
          const futureIconURL ="https://openweathermap.org/img/wn/"+futureIcon+"@2x.png"
          $('.fiveDay').append("<div class= 'card bg-primary card-body future-city col-lg-2 mr-3'><h5 class='text-white card-title'>"+moment().add(i, 'day').calendar() +"</h5><img src="+futureIconURL+"><p class='text-white'>"+dayResponse.list[i].main.temp+" <span>&#8457;</span></p><p class='text-white'>"+dayResponse.list[i].main.humidity+"% Humid</p></div>");
        }
        
        
        console.log(dayResponse);
      });
    })
    .fail(function(){
      $('.weatherDisplay').append("<h1 class='text-center'>CITY NOT FOUND</h1>");
    });

    
  }

$('.city-btn').click(function(){
    localStorage.setItem('city', $(this).siblings('h5').text());
   
    basicWeatherData(); 
   
});
