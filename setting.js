// menu.js: JavaScript and Node.JS enviornment
// const fs = require("fs");

document.body.style.backgroundImage = "url('src/img/bg.jpg')";
document.body.style.backgroundSize = "cover";
var panel = document.getElementById("panel");
var optionBGM = document.getElementById("option-bgm");
var optionColor = document.getElementById("option-color");
var optionDebug = document.getElementById("option-debug");
var optionTetColor = document.getElementById("option-tet-color");
var optionGeneral = document.getElementById("option-general");
var optionApply = document.getElementById("option-apply");
var generalRawString = ["sprint-line", "count-down", "info-time", "fall-time", "lock-time"];
var generalString = ["sprintLine", "countDown", "infoTime", "fallTime", "lockTime"];
var generalLeft =
[
  "<a title=\"Lines to erase in Sprint mode.\">Sprint Line</a>",
  "<a title=\"Time span between three, two and one.\">Countdown (ms)</a>",
  "<a title=\"Time span of information like Tetris or T-Spin.\">Info Time (ms)</a>",
  "<a title=\"Time span of tetromino falling down.\">Fall Time (ms)</a>",
  "<a title=\"Time span before tetromino locking down.\">Lock Time (ms)</a>"
];
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
  randomColor: false,
  sprintMode: false,
  debugMode: false,
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
var applyButton = document.createElement("button");
applyButton.className = "ui basic button";
applyButton.innerText = "Apply";
applyButton.setAttribute("onclick", "collectNewSetting()");
optionColorButton.className = (Setting.randomColor ? "ui basic button active" : "ui basic button");
optionDebugButton.className = (Setting.debugMode ? "ui basic button active" : "ui basic button");
optionColorButton.innerText = (Setting.randomColor ? "ON" : "OFF");
optionDebugButton.innerText = (Setting.debugMode ? "ON" : "OFF");
optionColorButton.setAttribute("onclick", "switchPressed(this)");
optionDebugButton.setAttribute("onclick", "switchPressed(this)");
optionColor.append(optionColorButton);
optionDebug.append(optionDebugButton);
optionApply.append(applyButton);

for (var index = 0; index < 5; index += 1)
{
  var newOptionBox = document.createElement("div");
  newOptionBox.className = "option-box";
  optionGeneral.append(newOptionBox);
  var newOptionLeft = document.createElement("div");
  var newOptionRight = document.createElement("div");
  newOptionLeft.className = "option-left";
  newOptionRight.className = "option-right";
  newOptionLeft.innerHTML = generalLeft[index];
  newOptionBox.append(newOptionLeft);
  newOptionBox.append(newOptionRight);
  var newUIInput = document.createElement("div");
  newUIInput.className = "ui input";
  newUIInput.id = generalRawString[index];
  newOptionRight.append(newUIInput);
  var newInput = document.createElement("input");
  newInput.type = "text";
  eval(`newInput.value = Setting.${generalString[index]}`);
  newUIInput.append(newInput);
}

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
  for (var index = 2; index >= 0; index -= 1)
  {
    var newUIInput = document.createElement("div");
    var newInput = document.createElement("input");
    newUIInput.className = "ui input";
    newUIInput.id = `${item}-${index}`;
    newInput.type = "text";
    newInput.value = rgbArray[index];
    newUIContainer.append(newUIInput);
    newUIInput.append(newInput);
  }
})

function collectNewSetting()
{
  if (Number(optionBGM.children[0].defaultValue) != NaN)
    Setting.bgm = Number(optionBGM.children[0].defaultValue);
  Setting.randomColor = (optionColorButton.className == "ui basic button active");
  Setting.debugMode = (optionDebugButton.className == "ui basic button active");
  for (var index = 0; index < 5; index += 1)
  {
    var num = Number(document.getElementById(generalRawString[index]).children[0].value);
    if (num != NaN) eval(`Setting.${generalString[index]} = num`);
  }
  for (var index = 0; index < 7; index += 1)
  {
    var rgbArray = Setting.color[index + 1].match(/-?([1-9]\d*(\.\d*)*|0\.[1-9]\d*)/g);
    for (var subIndex = 0; subIndex < 3; subIndex += 1)
    {
      var num = Number(document.getElementById(`${tetString[index]}-${subIndex}`).children[0].value);
      if (num != NaN) rgbArray[subIndex] = num;
    }
    Setting.color[index + 1] = `rgb(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]})`;
  }
  console.log(Setting);
}

function switchPressed(self)
{
  var trueValue = (self.className == "ui basic button active");
  self.className = (trueValue ? "ui basic button" : "ui basic button active");
  self.innerText = (trueValue ? "OFF" : "ON");
}

$(".ui.dropdown").dropdown();