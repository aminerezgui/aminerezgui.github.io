"use strict";


let createSquare = (height, width) =>
{

    let square = document.createElement("div");
    square.style["height"] = height;
    square.style["width"] = width;
    square.style["border"] = "solid black 1px";
    square.style["background-color"] = myWhite;

    return square;
}

let addItToGrid = (grid ,square) => grid.appendChild(square);

let createSquaresGrid = (grid ,column, row) =>
{
    let heightSquare = Math.round(100 / (column + 1)) + "%"; 
    let widthSquare = Math.round(100 / (row + 1)) + "%";
    let numberOfSquares = column * row;

    for(let i = 0; i < numberOfSquares; i++)
    {
        addItToGrid(grid, createSquare(heightSquare, widthSquare));
    }
    return grid.children;
}

let removeSquaresGrid = (grid) =>
{
    while(grid.children.length != 0)
    {
        grid.children[0].parentElement.removeChild(grid.children[0]);
    }
}

let myBlue = "rgb(161, 197, 255)";
let myWhite = "rgb(254, 255, 196)";

let squareBlue = (square) => square.style["background-color"] = myBlue;
let squareWhite = (square) => square.style["background-color"] = myWhite;

let switchColor = (square) =>
{
    squareBlue(square);
    setTimeout(squareWhite ,500, square);
}

let randomNumberBetween = (min, max) => Math.round(Math.random() * (max - min) + min);

let grid = document.getElementById("parent");

let listOfSquare = createSquaresGrid(grid, 3, 3);
let toLighten = 4;

let tracker = [];

let start = () =>
{
    disappear(startButton);
    disappear(retrace);
    disappear(verifyButton);
    disappear(flexC4);

    facileButton.removeEventListener("click", facileLevel);
    normalButton.removeEventListener("click", normalLevel);
    difficultButton.removeEventListener("click", difficultLevel);
    extremeButton.removeEventListener("click", extremeLevel);

    verifyButton.removeEventListener("click", verify);
    startButton.removeEventListener("click", start);
    allSquaresWhite();
    tracker = [];
    
    let numberOfLightened= 0;

    let lighten = () =>
    {
        let index = randomNumberBetween(0, listOfSquare.length - 1);
        while(tracker.includes(index))
        {
            index = randomNumberBetween(0, listOfSquare.length - 1);
        }
        tracker.push(index);
        switchColor(listOfSquare[index]);
        numberOfLightened++;
        if(numberOfLightened == toLighten)
        {
            clearInterval(startLighten);
            allSquaresClickable();
            verifyButton.addEventListener("click", verify);

            appear(retrace);
            appear(verifyButton);
            disappear(startButton);

            startButton.textContent = "Restart";
        }
    }

    let startLighten = setInterval(lighten, 1000);
}

let startButton = document.getElementById("start");

startButton.addEventListener("click", start);

let allSquaresWhite = () =>
{
    for(let i = 0; i < listOfSquare.length ;i++)
    {
        squareWhite(listOfSquare[i]);
    }
}

function f()
{
    this.style["background-color"] == myBlue ? squareWhite(this) : squareBlue(this);
}

let allSquaresClickable = () =>
{
    for(let i = 0; i < listOfSquare.length; i++)
    {
        listOfSquare[i].addEventListener("click", f);
        
    }
}

let allSquaresNotClickable = () =>
{
    for(let i = 0; i < listOfSquare.length; i++)
    {
        listOfSquare[i].removeEventListener("click", f);
    }
}

let retrace = document.getElementById("retrace");


let areEquale = (array1, array2) =>
{
    if(array1.length != array2.length)
    {
        return false;
    }
    else
    {
        for(let i = 0 ; i < array1.length ; i++)
        {
            if(!array1.includes(array2[i]))
            {
                return false;
            }
        }
    }
    return true;
}

let verifyingSquaresBlue = () =>
{
    let tracker = [];

    for(let i = 0; i < listOfSquare.length ;i++)
    {
        if(listOfSquare[i].style["background-color"] == myBlue)
        {
            tracker.push(i);
        }
    }

    return tracker;
}

let verify = () =>
{
    appear(flexC4);
    appear(startButton);
    disappear(verifyButton);
    disappear(retrace);

    verifyButton.removeEventListener("click", verify);
    let response = verifyingSquaresBlue();
    if(areEquale(tracker, response))
    {
        result.textContent = "Succeded !";
        result.style["color"] = "green";

        score.style["color"] = "green";

        flexC4.style["border-color"] = "green";
        flexC4.style["background-color"] = "rgb(147, 255, 135)";
    }
    else
    {
        result.textContent = "Failed !";
        result.style["color"] = "red";

        score.style["color"] = "red";

        flexC4.style["border-color"] = "red";
        flexC4.style["background-color"] = "rgb(255, 110, 110)";
    }
    if(response.length > toLighten)
    {
        score.textContent = "Too much !";
    }
    else
    {
        score.textContent = numberOfSameElement(tracker, response) + " / " + toLighten;
    }
    allSquaresNotClickable();
    startButton.addEventListener("click", start);

    facileButton.addEventListener("click", facileLevel);
    normalButton.addEventListener("click", normalLevel);
    difficultButton.addEventListener("click", difficultLevel);
    extremeButton.addEventListener("click", extremeLevel);
}

let numberOfSameElement = (array1, array2) =>
{
    let nb = 0;
    for(let i = 0; i < array1.length ;i++)
    {
        if(array2.includes(array1[i]))
        {
            nb++;
        }
    }
    return nb;
}

let verifyButton = document.getElementById("verify");



let result = document.getElementById("result");
let score = document.getElementById("score");


let facileButton = document.getElementById("facile");
squareBlue(facileButton);

let normalButton = document.getElementById("normal");
let difficultButton = document.getElementById("difficult");
let extremeButton = document.getElementById("extreme");

let facileLevel = () =>
{
    disappear(flexC4);

    squareBlue(facileButton);
    otherLevelWhite(normalButton, difficultButton, extremeButton);

    removeSquaresGrid(grid);
    createSquaresGrid(grid, 3, 3);
    toLighten = 4;
}

let normalLevel = () =>
{
    disappear(flexC4);

    squareBlue(normalButton);
    otherLevelWhite(facileButton, difficultButton, extremeButton);

    removeSquaresGrid(grid);
    createSquaresGrid(grid, 4, 4);
    toLighten = 6;
}

let difficultLevel = () =>
{
    disappear(flexC4);

    squareBlue(difficultButton);
    otherLevelWhite(normalButton, facileButton, extremeButton);

    removeSquaresGrid(grid);
    createSquaresGrid(grid, 5, 5);
    toLighten = 8;
}

let extremeLevel = () =>
{
    disappear(flexC4);

    squareBlue(extremeButton);
    otherLevelWhite(normalButton, difficultButton, facileButton);

    removeSquaresGrid(grid);
    createSquaresGrid(grid, 7, 7);
    toLighten = 10;
}

facileButton.addEventListener("click", facileLevel);
normalButton.addEventListener("click", normalLevel);
difficultButton.addEventListener("click", difficultLevel);
extremeButton.addEventListener("click", extremeLevel);

let flexC4 = document.querySelector(".C4");

let otherLevelWhite = (level1, level2, level3) =>
{
    squareWhite(level1);
    squareWhite(level2);
    squareWhite(level3);
}

let disappear = (htmlElement) => htmlElement.style["display"] = "none";
let appear = (htmlElement) => htmlElement.style["display"] = "";

disappear(retrace);
disappear(verifyButton);
disappear(flexC4);
