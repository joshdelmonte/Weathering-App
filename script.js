function DadosRecuperacao(){
    var nomeFresca = document.getElementById('entradaCidade');
   var nomeCidade = document.getElementById('nomeCidade');
    entradaCidade.innerHTML = nomeFresca.value
}

$("#cityBtn").on("click",()=>{
    nomeFresca = document.getElementById("entradaCidade");
    // Should translate this data to the HTML
fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + nomeFresca.value +"&appid=92a8d5845e11ed8a7876f7a2f68e8eb4")
.then(Response => Response.json())
.then(data =>{
    console.log(data);
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Temperatura").innerHTML = "Temp:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    // change to fit the before "for" statement
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Humidade").innerHTML = "Humidity:" +Number(data.list[i].main.temp).toFixed(1)+"%"
    }
     // change to fit the before "for" statements
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Ventura").innerHTML = "Wind:" +Number(data.list[i].main.temp).toFixed(1)+"mi/h"
    }
    // Second to to apply data from the first with lat and lon and continue to to the third for projected forecast
    function getGeo(nomeFresca)
    {
    fetch("http://api.openweathermap.org/geo/1.0/direct?q="+nomeFresca.value+"&limit=5&appid=${apiKey}")
    .then(function(resolva){
        return resolva.json();
    })
    .then(function(data){
        console.log(data[0].lat);
        var lat = data[0].lat;
        var lon = data[0].lon;
        getCurrentWeather(lat,lon);
        getForecastWeather(lat,lon);
    })
}
$("#cityBtn").on("click", function(inquiery){
    inquiery.preventDefault();
    var calculate = $("#entradaCidade").val();
    console.log(calculate);
    getGeo(calculate);
})
    var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";
function getCurrentWeather(lat,lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(resolva){
        return resolva.json();
    })
    .then(function(currentData){
        console.log("Current Weather Data: "+JSON.stringify(currentData));
        var tempP = $("<p>");
        tempP.text("Temp: "+currentData.main.temp);
        $("#current").append(tempP);
    })
    .then(function(currentData){
        console.log("Current Weather Data: "+JSON.stringify(currentData));
        var humidP = $("<p>");
        tempP.text("Humidity: "+currentData.main.humid);
        $("#current").append(humidP);
    })
    .then(function(currentData){
        console.log("Current Weather Data: "+JSON.stringify(currentData));
        var windP = $("<p>");
        tempP.text("Wind: "+currentData.main.wind);
        $("#current").append(windP);
    })
}
    
})
});

// // BELOW IS CODE USED TO AID FROM TUTOR

// var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";

// // Second to get the lat and lon of a entradaCidade

// function getCurrentWeather(lat,lon)
// {
//     fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(currentData){
//         console.log("Current Weather Data: "+JSON.stringify(currentData));
//         var tempP = $("<p>");
//         tempP.text("Temp: "+currentData.main.temp);
//         $("#current").append(tempP);
//     })
// }

// // Third to display the data of the forecast

// function getForecastWeather(lat,lon)
// {

// }

// // First to establish the city search

// function getGeo(city)
// {
//     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
//     .then(function(res){
//         return res.json();
//     })
//     .then(function(data){
//         console.log(data[0].lat);
//         var lat = data[0].lat;
//         var lon = data[0].lon;
//         getCurrentWeather(lat,lon);
//         getForecastWeather(lat,lon);
//     })
// }

// $("#cityBtn").on("click", function(e){
//     e.preventDefault();
//     var c = $("#entradaCidade").val();
//     getGeo(c);
// })