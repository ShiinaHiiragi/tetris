// menu.js: JavaScript and Node.JS enviornment
const electron = require("electron");
const remote = electron.remote;
const fs = require("fs");
var Setting = JSON.parse(fs.readFileSync("src/code/setting.json"));
var titleColor = rgbToRGBA(Setting.color[Math.floor(Math.random() * 7 + 1)], 0.6);
var panel = document.getElementById("panel");
var menuButton = document.getElementById("menu-button");
var menuText = document.getElementById("menu-text");
var nilSE = document.createElement("audio");
var buttonHover = document.createElement("audio");

document.body.style.backgroundImage = "url('src/img/bg.jpg')";
document.body.style.backgroundSize = "cover";
panel.style.border = "1.6px solid white";
menuText.innerText = "TETRIS";
if (Setting.randomColor) menuText.style.color = titleColor;
else menuText.style.color = "rgba(0, 0, 0, 0.6)";
addButton(menuButton, "Sprint", "enterTetris(true)");
addButton(menuButton, "Marathon", "enterTetris(false)");
addButton(menuButton, "Setting", "document.location.href = 'setting.html'");
addButton(menuButton, "Exit", "remote.app.quit()");
nilSE.src = "src/se/nil.mp3";
buttonHover.src = "src/se/hover.mp3";
buttonHover.volume = 0.2;
nilSE.load(), buttonHover.load();
nilSE.cloneNode().play();

function enterTetris(mode)
{
  Setting.sprintMode = mode;
  fs.writeFileSync("src/code/setting.json", JSON.stringify(Setting));
  document.location.href = "tetris.html";
}

function rgbToRGBA(rgb, opacity)
{
  var rgbArray = rgb.match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
  for (var index= 0; index < rgbArray.length; index += 1)
    rgbArray[index] = Number(rgbArray[index]);
  return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${opacity})`;
}

function addButton(div, text, func)
{
  var newButton = document.createElement("button");
  newButton.className = "ui basic button";
  newButton.style.borderRadius = "0";
  newButton.style.maxHeight = "6vh";
  newButton.style.fontSize = "2.5vh";
  newButton.setAttribute("onclick", func);
  newButton.innerText = text;
  div.append(newButton);
}

$(document).ready(function()
{
  $("button.ui.basic.button").mouseover(function() {
    buttonHover.cloneNode().play();
  });
});