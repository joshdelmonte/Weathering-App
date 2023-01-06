var apiRoot = "https://api.openweathermap.org";
var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";


$("#cityBtn").on("click", () => {
    newName = document.getElementById("cityinput").value;
    console.log(newName);
    // Should translate this data to the HTML
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + newName + "&appid=92a8d5845e11ed8a7876f7a2f68e8eb4")  /// --> we get back JSON object STRING DATA
        .then(response => {

            return response.json()
        })  // --> we are parsing the data we get back
        .then(data => {

            console.log(data.list[0]);


            var filteredArray = [];
            // loop through our forcast data
            for (let i = 0; i < data.list.length; i++) {
                // console.log(i);
                // console.log(data.list[i].main.temp);
                // console.log(data.list[i].dt);
                // console.log(data.list[i].dt_txt);  // --> we have pull this data apart
                var dateTime = data.list[i].dt_txt;
                var dateArray = dateTime.split(" ");
                // console.log(dateArray);
                // console.log(typeof dateArray);

                // how do/can we filter data in/out(?)
                if (dateArray[1] == "09:00:00") {
                    filteredArray.push(data.list[i])
                }

            }

            console.log(filteredArray);

            // WHEN I view current weather conditions for that city
            // THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

            for (var i = 0; i < 5; i++) {
                var temperatureF = (filteredArray[i]?.main.temp - 273.15) * 9 / 5 + 32;
                document.getElementById("dia-"+ (i + 1) + "-Temperatura").innerHTML = "Temp: " + temperatureF.toFixed(1) + "°F";
                console.log(temperatureF)
            }
            // change to fit the before "for" statement
            for (var i = 0; i < 5; i++) {
                document.getElementById("dia-"+ (i + 1) + "-Humidade").innerHTML = "Humidity: " + filteredArray[i].main.humidity + "%";
                console.log(filteredArray[i].main.humidity)
            }
            // change to fit the before "for" statements
            for (var i = 0; i < 5; i++) {
                document.getElementById("dia-"+ (i + 1) +"-Ventura").innerHTML = "Wind: " + filteredArray[i].wind.speed + "mi/h";
            }
            // Second to to apply data from the first with lat and lon and continue to to the third for projected forecast
            function getGeo(newName) {
                fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + newName.value + "&limit=5&appid=${apiKey}")
                    .then(function (resolva) {
                        return resolva.json();
                    })
                    .then(function (data) {
                        console.log(data[0].lat);
                        var lat = data[0].lat;
                        var lon = data[0].lon;
                        getCurrentWeather(lat, lon);
                        getForecastWeather(lat, lon);
                    })
            }
            $("#cityBtn").on("click", function (inquiery) {
                inquiery.preventDefault();
                var calculate = $("#cityinput").val();
                console.log(calculate);
                getGeo(calculate);
            })
            var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";
            function getCurrentWeather(lat, lon)
            // This is the function that will get the current weather data
            // It will take in the latitude and longitude of the city   
            {
                var apiUrl = `${apiRoot}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;

                fetch(apiUrl)
                    .then(function (resolva) {
                        return resolva.json();
                    })
                    .then(function (currentTemp) {
                        console.log("Current Weather Data: " + JSON.stringify(currentTemp));
                        var temp = $("<p>");
                        temp.text("Temp: " + currentTemp.main.temp);
                        $("#current").append(temp);
                    })
                    .then(function (currentHumidity) {
                        console.log("Current Weather Data: " + JSON.stringify(currentHumidity));
                        var humid = $("<p>");
                        humid.text("humidity: " + currentHumidity.main.humidity);
                        $("#current").append(humid);
                    })
                    .then(function (currentData) {
                        console.log("Current Weather Data: " + JSON.stringify(currentData));
                        var wind = $("<p>");
                        wind.text("wind: " + currentData.wind.speed);
                        $("#current").append(wind);
                    })
            }
            //This function will get the forecast weather data for the city

            function getForecastWeather(lat, lon) {
                var apiUrl = `${apiRoot}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
                fetch(apiUrl)
                    .then(function (resolva) {
                        return resolva.json();
                    })
                    .then(function (forecastData) {
                        console.log("Forecast Weather Data: " + JSON.stringify(forecastData));
                    })


            }
        })
        .catch(err => {
            console.log(err);
        })
});




// const API_KEY = '92a8d5845e11ed8a7876f7a2f68e8eb4';

// async function searchCity(city) {
//     try {
//         // Make API request to get current and future weather conditions for the city
//         const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
//         const currentWeatherData = await currentWeatherResponse.json();
//         const futureWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`);
//         const futureWeatherData = await futureWeatherResponse.json();

//         // Display current and future weather conditions on the page
//         displayCurrentWeather(currentWeatherData);
//         displayFutureWeather(futureWeatherData);

//         // Add city to search history
//         addToSearchHistory(city);
//     } catch (error) {
//         console.error(error);
//     }
// }

// function displayCurrentWeather(data) {
//     // Extract city name, date, icon, temperature, humidity, and wind speed from data
//     const cityName = data.name;
//     const date = new Date(data.dt * 1000).toLocaleDateString();
//     const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//     const temperature = data.main.temp;
//     const humidity = data.main.humidity;
//     const windSpeed = data.wind.speed;

//     // Update page with current weather information
//     document.getElementById('city-name').textContent = cityName;
//     document.getElementById('date').textContent = date;
//     document.getElementById('weather-icon').src = iconUrl;
//     document.getElementById('temperature').textContent = temperature;
//     document.getElementById('humidity').textContent = humidity;
//     document.getElementById('wind-speed').textContent = windSpeed;
// }

// function displayFutureWeather(data) {
//     // Extract 5-day forecast data from the response
//     const forecastData = data.list.slice(0, 5);

//     // Clear any existing forecast data from the page
//     document.getElementById('forecast').innerHTML = '';

//     // Iterate over forecastData and add a forecast card for each day
//     forecastData.forEach(day => {
//         // Extract date, icon, temperature, wind speed, and humidity from day's data
//         const date = new Date(day.dt * 1000).toLocaleDateString();
//         const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
//         const temperature = day.main.temp;
//         const humidity = day.main.humidity;
//         const windSpeed = day.wind.speed;

//         // Create forecast card element and add data to it
//         const forecastCard = document.createElement('div');
//         forecastCard.classList.add('forecast-card');
//         forecastCard.innerHTML = `
//       <div class="date">
//         ${date}
//         </div>
//         <img src="${iconUrl}" alt="Weather icon" />
//         <div class="temperature">

//         </div>
//         <div class="humidity">

//         </div>
//         <div class="wind-speed">

//         </div>
//         `;
//         document.getElementById('forecast').appendChild(forecastCard);
//     });
// }

// function addToSearchHistory(city) {
//     // Get search history from local storage
//     const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

//     // Add city to search history if it's not already in the history
//     if (!searchHistory.includes(city)) {
//         searchHistory.push(city);
//     }

//     // Save search history to local storage
//     localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

//     // Update search history on the page
//     displaySearchHistory();
// }

// function displaySearchHistory() {
//     // Get search history from local storage
//     const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

//     // Clear any existing search history from the page
//     document.getElementById('search-history').innerHTML = '';

//     // Iterate over searchHistory and add a search history button for each city
//     searchHistory.forEach(city => {
//         // Create search history button element and add data to it
//         const searchHistoryButton = document.createElement('button');
//         searchHistoryButton.classList.add('search-history-button');
//         searchHistoryButton.textContent = city;
//         document.getElementById('search-history').appendChild(searchHistoryButton);
//     });
// }

