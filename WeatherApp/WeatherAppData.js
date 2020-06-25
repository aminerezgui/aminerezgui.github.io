"use strict";

var dataWeather;
var http;
var url;
var apiKey = "28660fa23e14d1acb34a373a35f0720c";
var method = "POST";


var cityNameOut = document.querySelector(".CityNameOut");
var description = document.querySelector(".Description");
var temperature = document.querySelector(".Temperature");

function f()
{
    if(http.readyState === XMLHttpRequest.DONE && http.status === 200)
    {
        console.log("it's good !");
        console.log(http.readyState);
        console.log(XMLHttpRequest.DONE);
        console.log(http.status);
        dataWeather = JSON.parse(http.responseText);
        cityNameOut.textContent = dataWeather.name
        description.textContent = dataWeather.weather[0].description
        temperature.textContent = Math.round(dataWeather.main.temp - 273.15) + " °C"

        document.querySelector(".C2").style["background-color"] = "rgb(3, 252, 107)";
        cityNameOut.style.display = "block";
        description.style.display = "block";
        temperature.style.display = "block";
    }
}

function searchWeather()
{
    http = new XMLHttpRequest();
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("input").value + "&appid=" + apiKey;
    http.open(method, url);
    http.onreadystatechange = f;
    http.send();
}

var button = document.querySelector(".ShowWeather");

button.addEventListener("click", searchWeather);