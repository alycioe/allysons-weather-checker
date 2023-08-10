const apiKey = "8f2a3f4166bf60476ee14627fd9ec188";
var inputCity = document.querySelector("#write-city");
var searchCity = document.querySelector("#search-city");
var currentCity = document.querySelector("#current-city");
var weatherInfo = document.querySelector("#temp-wind-humid");
var pastSearched = document.querySelector("#past-searches");
var city;
// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

function weatherDisplay() {
    city = inputCity.value;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(queryURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // place today's weather under current city id
            //console.log(data);
            var currentWeather = $('#current-city');

            // the searched city's text will be added and put underneath the current city id
            var selectedCity = $('<h2>');
            selectedCity.text(city)
            currentWeather.append(selectedCity);

            // this will be placed next to the city when it is outputted
            var dateTime = $('<span>');
            dateTime.text(dayjs.unix(data.dt).format(" MM/DD/YYYY"));
            selectedCity.append(dateTime);


            // this will add the icon that correlates to the weather next to the selected date information
            var weatherIcon

            // this will add todays temperature underneath the place name, weather status, and icon, in the same id
            var todaysTemperature = $('#temp');
            todaysTemperature.text("Temperature: " + data.main.temp);


            // this will add the wind speed underneath the temperature in the same id
            var todaysWind = $('#wind');
            todaysWind.text("Wind Speed: " + data.wind.speed);

            // this will add today's humidity underneath the wind speed in the same id
            var todaysHumidity = $('#humidity');
            todaysHumidity.text("Humidity: " + data.main.humidity);

            var futureForecastURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data.coord.lat + "&lon=" + data.coord.lon + "&units=imperial&appid=" + apiKey;
            return fetch(futureForecastURL) 
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            //console.log(data);
            for(var i = 0; i < data.list.length; i=i+8) {
                var day = data.list[i]
                //console.log(day);
                
                var weeklyWeather = $('.daily-weather');
                    weeklyWeather.addClass('row col-8 bg-light border rounded card bg-primary w-50 m-3')

                var weeklyTemp = $('.daily-temp');
                weeklyTemp.text("Temperature: " + day.main.temp + "°F");
                console.log(day.main.temp)

                var weeklyWind = $('.daily-wind');
                weeklyWind.text("Wind Speed: " + day.wind.speed);

                var weeklyHumidity = $('.daily-humidity');
                weeklyHumidity.text("Humidity: " + day.main.humidity);

            }

            
        })
}

searchCity.addEventListener('click', weatherDisplay);