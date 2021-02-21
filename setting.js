// menu.js: JavaScript and Node.JS enviornment
// const fs = require("fs");

document.body.style.backgroundImage = "url('src/img/bg.jpg')";
var panel = document.getElementById("panel");
var optionBGM = document.getElementById("option-bgm");
var optionColor = document.getElementById("option-color");
var optionDebug = document.getElementById("option-debug");
var sprintLine = document.getElementById("sprint-line");
var countDown = document.getElementById("countdown-time");
var infoTime = document.getElementById("info-time");
var fallTime = document.getElementById("fall-time");
var lockTime = document.getElementById("lock-time");
var optionTetColor = document.getElementById("option-tet-color");
var generalString = ["sprintLine", "countDown", "infoTime", "fallTime", "lockTime"];
var tetString = ["O", "L", "J", "T", "S", "Z", "I"];
var Setting =
{
  color:
  [
    "rgb(210, 210, 210)",
    "rgb(252, 92, 101)",
    "rgb(253, 150, 68)",
    "rgb(254, 211, 48)",
    "rgb(38, 222, 129)",
    "rgb(69, 170, 242)",
    "rgb(75, 123, 236)",
    "rgb(165, 94, 234)"
  ],
  keyDownCode:
  {
    left: 37,
    right: 39,
    hold: 16,
    leftHalf: 88,
    rightHalf: 67,
    leftQuarter: 90,
    rightQuarter: 86,
    hardDrop: 38,
    softDrop: 40
  },
  bgm: 3,
  randomColor: true,
  sprintMode: true,
  debugMode: true,
  sprintLine: 40,
  countDown: 500,
  infoTime: 1000,
  fallTime: 500,
  lockTime: 500
}

panel.style.border = "1.6px solid white";
optionBGM.children[0].defaultValue = Setting.bgm;
var optionColorButton = document.createElement("button");
var optionDebugButton = document.createElement("button");
optionColorButton.className = (Setting.randomColor ? "ui basic button active" : "ui basic button");
optionDebugButton.className = (Setting.debugMode ? "ui basic button active" : "ui basic button");
optionColorButton.innerText = (Setting.randomColor ? "ON" : "OFF");
optionDebugButton.innerText = (Setting.debugMode ? "ON" : "OFF");
optionColorButton.setAttribute("onclick", "switchPressed(this)");
optionDebugButton.setAttribute("onclick", "switchPressed(this)");
optionColor.append(optionColorButton);
optionDebug.append(optionDebugButton);
generalString.forEach((item) => { eval(`${item}.children[0].value = Setting.${item};`); });
tetString.forEach((item, index) =>
{
  var newOptionBox = document.createElement("div");
  newOptionBox.className = "option-box";
  optionTetColor.append(newOptionBox);
  var newOptionLeft = document.createElement("div");
  var newOptionRight = document.createElement("div");
  newOptionLeft.className = "option-left";
  newOptionRight.className = "option-right";
  newOptionLeft.style.width = "30%";
  newOptionRight.style.width = "70%";
  newOptionLeft.innerText = `${item} Tetromino`;
  newOptionBox.append(newOptionLeft);
  newOptionBox.append(newOptionRight);
  var newUIContainer = document.createElement("div");
  newUIContainer.className = "ui container";
  newUIContainer.id = `option-${item}`;
  newOptionRight.append(newUIContainer);
  var rgbArray = Setting.color[index + 1].match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
  var rgb = ["B, G, R"];
  for (var index = 2; index >= 0; index -= 1)
  {
    var newUIInput = document.createElement("div");
    var newInput = document.createElement("input");
    newUIInput.className = "ui input";
    newUIInput.id = `${item}-${rgb[index]}`;
    newInput.type = "text";
    newInput.value = rgbArray[index];
    newUIContainer.append(newUIInput);
    newUIInput.append(newInput);
  }
})

function collectNewSetting()
{
  Setting.bgm = Number(optionBGM.children[0].defaultValue);
  Setting.randomColor = (optionColorButton.className == "ui basic button active");
  Setting.debugMode = (optionDebugButton.className == "ui basic button active");
  generalString.forEach((item) => { eval(`if (Number(${item}.children[0].value) != NaN)
    Setting.${item} = Number(${item}.children[0].value);`); });
  console.log(Setting);
}

function switchPressed(self)
{
  var trueValue = (self.className == "ui basic button active");
  self.className = (trueValue ? "ui basic button" : "ui basic button active");
  self.innerText = (trueValue ? "OFF" : "ON");
}

$(".ui.dropdown").dropdown();