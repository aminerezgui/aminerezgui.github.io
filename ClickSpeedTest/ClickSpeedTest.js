"use strict";


var starter = document.querySelector(".Starter");
var clicker = document.querySelector(".Clicker");
var result1 = document.querySelector(".Result1");
var result2 = document.querySelector(".Result2");
var result3 = document.querySelector(".Result3");


var numberOfClicked = 0;
let miliSeconds = 10000;
let seconds = miliSeconds / 1000;

let oneSecond = 1000;
let secondsLasting;
let timer;

function endGame()
{
    clearInterval(timer);

    starter.style["background-color"] = "red";
    clicker.style["background-color"] = "red";

    starter.addEventListener("mouseover", modifyColorGreen);
    starter.addEventListener("mouseout", modifyColorRed);
    

    starter.textContent = "Start";

    let speed = (numberOfClicked / seconds).toFixed(1);
    clicker.removeEventListener("click", countClick);
    clicker.textContent = "Click";
    result1.textContent = `Time out !`;
    result2.textContent = `${numberOfClicked} clicks in ${seconds} sec !`;
    result3.textContent = `Speed: ${speed} Clicks/sec !`;
    result1.style.display = "block";
    result2.style.display = "block";
    result3.style.display = "block";
    numberOfClicked = 0;
    starter.addEventListener("click", startGame);
}

function startGame()
{
    starter.removeEventListener("mouseover", modifyColorGreen);
    starter.removeEventListener("mouseout", modifyColorRed);

    starter.removeEventListener("click", startGame);
    result1.style.display = "none";
    result2.style.display = "none";
    result3.style.display = "none";

    clicker.addEventListener("click", countClick);

    starter.style["background-color"] = "green";
    clicker.style["background-color"] = "green";

    secondsLasting = seconds;
    starter.textContent = "" + secondsLasting;
    timer = setInterval(chrono, oneSecond);


    setTimeout(endGame, miliSeconds);
}

function countClick()
{
    numberOfClicked++;
    clicker.textContent = "" + numberOfClicked;
}

function chrono()
{   
    secondsLasting--;
    starter.textContent = "" + secondsLasting;
}

starter.addEventListener("click", startGame);

starter.addEventListener("mouseover", modifyColorGreen);
starter.addEventListener("mouseout", modifyColorRed);

function modifyColorGreen()
{
    starter.style["background-color"] = "green";
}
function modifyColorRed()
{
    starter.style["background-color"] = "red";
}