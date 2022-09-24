/*function DadosRecuperacao(){
    var nomeFresca = document.getElementById(entradaCidade);
    var nomeCidade = document.getElementById(nomeCidade);
    entradaCidade.innerHTML = nomeFresca.value
}

fetch("http://api.openweathermap.org/data/2.5/forecast?q='+nomeFresca.value+'&appid=92a8d5845e11ed8a7876f7a2f68e8eb4")
.then(Response => Response.json())
.then(data =>{
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Temperatura").innerHTML = "Temp:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Humidade").innerHTML = "Humidity:" +Number(data.list[i].main.temp).toFixed(1)+"°"
    }
    for(i = 0;i = 5; i++){
        document.getElementById("dia"+(i + 1)+"Ventura").innerHTML = "Wind:" +Number(data.list[i].main.temp).toFixed(1)+"m/h"
    }

    function getGeo(entradaCidade)
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${entradaCidade}&limit=5&appid=${apiKey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(odado){
        console.log(odado[0].lat);
        var lat = odado[0].lat;
        var lon = odado[0].lon;
        getCurrentWeather(lat,lon);
        getForecastWeather(lat,lon);
    })
}

$("#cityBtn").on("click", function(inquiery){
    inquiery.preventDefault();
    var calculate = $("#entradaCidade").val();
    getGeo(calculate);
})

    var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";

function getCurrentWeather(lat,lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(currentData){
        console.log("Current Weather Data: "+JSON.stringify(currentData));
        var tempP = $("<p>");
        tempP.text("Temp: "+currentData.main.temp);
        $("#current").append(tempP);
    })
}

    
})*/

var apiKey = "92a8d5845e11ed8a7876f7a2f68e8eb4";

function getCurrentWeather(lat,lon)
{
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(currentData){
        console.log("Current Weather Data: "+JSON.stringify(currentData));
        var tempP = $("<p>");
        tempP.text("Temp: "+currentData.main.temp);
        $("#current").append(tempP);
    })
}

function getForecastWeather(lat,lon)
{

}

function getGeo(city)
{
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then(function(res){
        return res.json();
    })
    .then(function(data){
        console.log(data[0].lat);
        var lat = data[0].lat;
        var lon = data[0].lon;
        getCurrentWeather(lat,lon);
        getForecastWeather(lat,lon);
    })
}

$("#cityBtn").on("click", function(e){
    e.preventDefault();
    var c = $("#entradaCidade").val();
    getGeo(c);
})